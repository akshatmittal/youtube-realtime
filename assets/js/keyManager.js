YT.keyManager = {
    keys: ["AIzaSyBSyBp1KHjjXox6e9FBPoOCE1mbLvVUzUM", "AIzaSyDeLLOyrp1yCZCOmVXg3u8Jxtasre2NxFA", "AIzaSyDFXBcpYskzYNTOZEgq133xXP5GUH4Ct3k", "AIzaSyBRnIik08vLUsSyJs_M_A7eMRgxaBMRpdU", "AIzaSyD_HMEbLyCOVPB53JBFRS5--58sAwhY2Ic", "AIzaSyA50UgQA00oM7ztJp97nWC7XM9nggeGP8g", "AIzaSyAwOwvwAGbUF2xTmsJY7Loyrg8qE-0syQE", "AIzaSyDxkDsPPEgePGoyZct62M0MdYDBRzuudKY", "AIzaSyA1v68XzPdA9rfrsPUFhgZ500_uWdf2A8I", "AIzaSyCb9zxTIuGGEBIJHLfj8lOb4k4U0jWstGg", "AIzaSyBgiHBx5C-rkWzY0w2c7SWUC-RHyRpLv7E", "AIzaSyDi5W8BNEZRYCkiuV-rSLWzlfDOIwEitjw", "AIzaSyBraMJy98X7r9-jPRznAaT1g9cdAAFQyFE", "AIzaSyCg_tlHelOnRsDjfdv-3Kntb3GXaYEXzk4", "AIzaSyAI0sPgCpm_KjEL7u5hI3m0pin0mBZbnLs", "AIzaSyDqipNMKLaN_ZVbZ-_f40YFp_vUTmhqMxU", "AIzaSyCzF4_POQGk2U_0TiaGF0ZqDMHIsqGA7es", "AIzaSyCgCBendo5K3kPNEL9tO_TI4G8WAdp_hnM", "AIzaSyAhXueAQP-HfZdLtoY9Tlxqt9zzc7yTrTg", "AIzaSyBUnyRp5Ny6HKeRUx8nGGAuL6r8BlUsqIU"],
    keyIndex: 0,
    getKey: function () {
        this.keyIndex = (this.keyIndex + 1) % (this.keys.length);
        return this.keys[this.keyIndex];
    },
    shuffleKeys: function () {
        this.keys.shuffle();
    }
}