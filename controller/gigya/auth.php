<?php
error_reporting(0);


$uid= $argv[1];
$siteUID = $argv[2]; 
$apiMethod= $argv[3]; 

# http://developers.gigya.com/display/GD/REST+API+with+Gigya's+Authorization+Method

require_once("OAuth.php");
// Signature calculation method
// The parameters for the signature calculation are:
//  1. Your secret key
//  2. The HTTP method ('GET' or 'POST')
//  3. Method API name (e.g. 'getUserInfo')
//  4. The parameters of the API method. Note that each API method has a different set of parameter.
function calcSignatureREST($dataCenter, $secretKey, $httpMethod, $apiMethod, $parameters) {
    $l = 'http://socialize.'.$dataCenter.'.gigya.com/socialize.'.$apiMethod;
    // echo $l."\n";
    $req = OAuthRequest::from_request($httpMethod,$l,$parameters);
    $baseString = $req->get_signature_base_string();
    return  base64_encode(hash_hmac('sha1', $baseString, base64_decode($secretKey), true));
}

// Specify a datacenter e.g., 'us1', 'eu1' or 'au1'
//$dataCenter = "us1";// "[ENTER THE DESIRED DATACENTER]";
$dataCenter = "eu1";// "[ENTER THE DESIRED DATACENTER]";

//$apiKey = ""; //"[ENTER YOUR API KEY HERE]";
$apiKey = ""; //"[ENTER YOUR API KEY HERE]";


// Your secret key (can be found at the bottom of the Site Setup page on the Gigya website)
$secretKey = ""; //"[ENTER YOUR SECRET KEY HERE]";
$timeStamp = time();
$nonce = $timeStamp . rand();
// $apiMethod = "getUserInfo";
// $uid = "";
// The parameters for the socialize.getUserInfo API call:
$parameters = array(
    "apiKey" => $apiKey,
    "nonce" => $nonce,
    "timestamp" => $timeStamp,
    "uid" => $uid,
    "siteUID" => $siteUID
    );
$signature = calcSignatureREST($dataCenter, $secretKey, 'GET', $apiMethod, $parameters);


 // oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret)

 /*
 oauthSignature.generate(
 'GET'
 , 'http://socialize.us1.gigya.com/socialize.getUserInfo'
 , {'apiKey':''}, "")
 */

//Construct the URL and include the signature
$requestURL = "http://socialize.".$dataCenter.".gigya.com/socialize." 
. $apiMethod . "?apiKey=" . urlencode($apiKey) . 
                "&nonce=" . $nonce .
                "&sig=" . urlencode($signature) . 
                "&siteUID=" . urlencode($siteUID) .
                "&timestamp=" . $timeStamp . 
                "&uid=" . urlencode($uid);


//Check to see if libcurl is installed
if (!function_exists('curl_init')){
    die("Sending this request requires PHP to be compiled with libcurl.");
}

//Now send the request
$ch = curl_init($requestURL);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// echo $response;

$xml = simplexml_load_string($response);
$json = json_encode($xml);
$array = json_decode($json,TRUE);

echo $json;

//echo "\n\n";
//echo $requestURL;
?>
