// Roblox Open Cloud API Service
YT.robloxApi = {
  baseUrl: "https://groups.roblox.com/v1",
  
  // Get group information by ID
  getGroupInfo: function(groupId) {
    const url = `${this.baseUrl}/groups/${groupId}`;
    return $.getJSON(url);
  },
  
  // Get group member count
  getGroupMemberCount: function(groupId) {
    const url = `${this.baseUrl}/groups/${groupId}`;
    return $.getJSON(url).then(data => ({
      memberCount: data.memberCount,
      name: data.name,
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
    return $.getJSON(url);
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
        name: groupInfo.name,
        description: groupInfo.description,
        memberCount: groupInfo.memberCount,
        icon: icon || "assets/images/icon.png",
        // Map to expected structure for compatibility
        user: [
          { count: groupInfo.name },          // name
          { count: icon || "assets/images/icon.png" }, // profile image
          { count: "assets/images/banner.jpg" }        // cover image
        ],
        counts: [
          { count: groupInfo.name },
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