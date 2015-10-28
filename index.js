var CryptoJS = require("crypto-js");
var request = require("request");
var secret = "请把这里替换成你的签名所用密钥";

var params_example = {
  "number": "BAOBAOGE45315277",
  "discount": -5,
  "postage": 10,
  "receiver_region1": "广东省",
  "receiver_region2": "深圳市",
  "receiver_region3": "龙岗区",
  "receiver_address": "恒特美大厦1201",
  "receiver_name": "刘劲",
  "receiver_phone": "13800138000",
  "receiver_note": "",
  "delivery_company": "申通快递",
  "items": [
    {
      "amount": 100,
      "pdf": [
        "https://dn-pfio.qbox.me/baolaika-example.pdf"
      ],
      "product": "宝宝相册 14x14"
    }
  ],
  "commit": true
};

function sign (str) {
  var text = "/partner/retailer" + "\n" + str;
  var hash = CryptoJS.HmacSHA1(text, secret).toString();
  return hash;
}

function post (commit) {
  params_example.commit = commit;
  var params = params_example;
  var options = {
    method: "POST",
    "rejectUnauthorized": false,
    "url": 'https://api.puffant.com/partner/retailer',
    "headers": {
      "X-Puffant-Retailer": "baobaoge",
      "X-Puffant-Signature": sign(JSON.stringify(params))
    },
    json: params
  };

  request(options, function (err, res, body) {
    if (err) { console.error(err); }
    if (res.statusCode != 200) {
      console.error(body);
    };
    if (!err && res.statusCode == 200) {
      // 处理返回的请求
      console.log(body);
    }
  });
}

post(false); // commit 为 false
post(true);  // commit 为 true
