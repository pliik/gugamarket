// MeoCloud API Configuration
meocloud_conf = {
	api : {
		root : "meocloud",
		storage : "/1",
		endpoint : "https://publicapi.meocloud.pt",
		content_endpoint : "https://api-content.meocloud.pt"
	},
	oauth : {
		request_token_endpoint : "https://meocloud.pt/oauth/request_token",
		access_token_endpoint : "https://meocloud.pt/oauth/access_token"
	}
}

// Your OAuth application key and secret. Get them from https://cloudpt.pt/my_apps
oauth_key    = "xptz";
oauth_secret = "xptz";

// Values obtained after running login.js
oauth_access_token = "xptz";
oauth_token_secret = "xptz";

meocloud_main_folder = "/xptz";
meocloud_resources_folder = meocloud_main_folder+"/resources";
meocloud_images_folder = meocloud_resources_folder+"/images";
