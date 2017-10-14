<?php


error_reporting(0);


$code = $argv[1];

$apiKey = ""; //"[ENTER YOUR API KEY HERE]";
$secretKey = ""; //"[ENTER YOUR SECRET KEY HERE]";
$requestURL = "https://socialize.gigya.com/socialize.getToken?grant_type=authorization_code&client_id=" . 
                urlencode($apiKey) . "&client_secret=" . urlencode($secretKey) . "&code=" . urlencode($code);


echo "\n\n".$requestURL."\n\n";

//Check to see if libcurl is installed
if (!function_exists('curl_init')){
    die("Sending this request requires PHP to be compiled with libcurl.");
}

$r = @exec("curl ". escapeshellcmd($requestURL));

echo $r;

//$xml = simplexml_load_string($response);
//$json = json_encode($xml);
//$array = json_decode($json,TRUE);

// echo $response;

//echo "\n\n";
//echo $requestURL;

?>
