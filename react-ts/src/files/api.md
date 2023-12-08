## 自定义音乐源

上传JSON文件，格式如下:
```json
{
    "ApiBaseUrl": "接口网址",
    "页面名": {
        "接口名": {
            "接口方法": "GET | POST",
            "接口地址": "接口地址",
            "接口参数": {
                "参数名": "参数值"
            }
        }
    }
}
```
例:
```json
{
    "ApiBaseUrl": "http://localhost:3000",
    "HOME": {
        "banner": {
            "method": "GET",
            "url": "/banner",
            "params": {
                "type": 0
            }
        }
    }
}
```