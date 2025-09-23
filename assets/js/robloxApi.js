// Roblox Open Cloud API Service
YT.robloxApi = {
  baseUrl: "https://apis.roblox.com/cloud/v2",
  apiKey: null, // API key for Open Cloud requests
  
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
      console.warn('No Roblox API key found. You can set it using YT.robloxApi.setApiKey("your-key") or window.ROBLOX_API_KEY = "your-key"');
    }
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