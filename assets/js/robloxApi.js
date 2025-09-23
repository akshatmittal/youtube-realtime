// Roblox Open Cloud API Service
YT.robloxApi = {
  baseUrl: "https://apis.roblox.com/cloud/v2",
  apiKey: null, // API key for Open Cloud requests
  apiKeyFetchUrl: "https://bgcounts.bgtrack.net/roblox-group/keys.json",
  isApiKeyFetching: false, // Prevent multiple simultaneous fetches
  
  // Initialize and check for API key from various sources
  init: function() {
    // Check for API key in various locations
    if (window.ROBLOX_API_KEY) {
      this.apiKey = window.ROBLOX_API_KEY;
    } else if (localStorage.getItem('roblox_api_key')) {
      this.apiKey = localStorage.getItem('roblox_api_key');
    }
    
    // Log if no API key is found (for debugging)
    if (!this.apiKey) {
      console.warn('No Roblox API key found. Will attempt to fetch automatically when needed.');
    }
  },
  
  // Fetch API key from external service
  fetchApiKey: function() {
    if (this.isApiKeyFetching) {
      return Promise.resolve(false); // Already fetching
    }
    
    this.isApiKeyFetching = true;
    
    return $.ajax({
      url: this.apiKeyFetchUrl,
      method: 'GET',
      timeout: 10000 // 10 second timeout
    }).then((data) => {
      this.isApiKeyFetching = false;
      
      // Assume the response contains an API key
      let key = null;
      if (typeof data === 'string') {
        // If response is a string, use it directly
        key = data.trim();
      } else if (data && data.key) {
        // If response is an object with a 'key' property
        key = data.key;
      } else if (data && data.apiKey) {
        // If response is an object with an 'apiKey' property
        key = data.apiKey;
      } else if (Array.isArray(data) && data.length > 0) {
        // If response is an array, take the first element
        key = data[0];
      }
      
      if (key) {
        this.setApiKey(key);
        console.log('Successfully fetched API key from external service');
        return true;
      } else {
        console.warn('Failed to extract API key from response:', data);
        return false;
      }
    }).catch((error) => {
      this.isApiKeyFetching = false;
      console.warn('Failed to fetch API key from external service:', error);
      return false;
    });
  },
  
  // Set the API key for Open Cloud requests
  setApiKey: function(key) {
    this.apiKey = key;
    // Optionally save to localStorage for persistence
    if (key) {
      localStorage.setItem('roblox_api_key', key);
    } else {
      localStorage.removeItem('roblox_api_key');
    }
  },
  
  // Make a request with proper headers for Open Cloud API
  makeCloudRequest: function(url, options = {}) {
    // If this is a Cloud API request and we don't have an API key, try to fetch one
    if (url.includes('apis.roblox.com/cloud') && !this.apiKey && !this.isApiKeyFetching) {
      return this.fetchApiKey().then((success) => {
        if (success) {
          // Retry the request with the new API key
          return this.makeCloudRequest(url, options);
        } else {
          // Proceed without API key (may fail, but let the caller handle it)
          return this.makeCloudRequestWithCurrentKey(url, options);
        }
      });
    }
    
    return this.makeCloudRequestWithCurrentKey(url, options);
  },
  
  // Internal method to make cloud request with current API key
  makeCloudRequestWithCurrentKey: function(url, options = {}) {
    const headers = {};
    if (this.apiKey && url.includes('apis.roblox.com/cloud')) {
      headers['x-api-key'] = this.apiKey;
    }
    
    const requestOptions = {
      url: url,
      headers: headers,
      ...options
    };
    
    return $.ajax(requestOptions);
  },
  
  // Get group information by ID
  getGroupInfo: function(groupId) {
    const url = `${this.baseUrl}/groups/${groupId}`;
    return this.makeCloudRequest(url);
  },
  
  // Get group member count
  getGroupMemberCount: function(groupId) {
    const url = `${this.baseUrl}/groups/${groupId}`;
    return this.makeCloudRequest(url).then(data => ({
      memberCount: data.memberCount,
      name: data.displayName,
      description: data.description,
      id: data.id
    }));
  },
  
  // Get group icon
  getGroupIcon: function(groupId) {
    const url = `https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupId}&size=420x420&format=Png&isCircular=false`;
    return $.getJSON(url);
  },
  
  // Search for groups by name
  searchGroups: function(keyword) {
    const url = `${this.baseUrl}/groups/search?keyword=${encodeURIComponent(keyword)}&limit=10`;
    return this.makeCloudRequest(url);
  },
  
  // Get comprehensive group data
  getGroupData: function(groupId) {
    const promises = [
      this.getGroupInfo(groupId),
      this.getGroupIcon(groupId)
    ];
    
    return Promise.all(promises).then(([groupInfo, iconData]) => {
      const icon = iconData.data && iconData.data[0] ? iconData.data[0].imageUrl : null;
      
      return {
        id: groupInfo.id,
        name: groupInfo.displayName,
        description: groupInfo.description,
        memberCount: groupInfo.memberCount,
        icon: icon || "assets/images/icon.png",
        // Map to expected structure for compatibility
        user: [
          { count: groupInfo.displayName },          // name
          { count: icon || "assets/images/icon.png" }, // profile image
          { count: "assets/images/banner.jpg" }        // cover image
        ],
        counts: [
          { count: groupInfo.displayName },
          { count: icon || "assets/images/icon.png" },
          { count: groupInfo.memberCount },   // members (like subscribers)
          { count: 0 },                      // views (not available for groups)
          { count: 0 },                      // comments (not available for groups)
          { count: 0 }                       // videos (not available for groups)
        ]
      };
    });
  }
};

// Initialize the API on load
YT.robloxApi.init();