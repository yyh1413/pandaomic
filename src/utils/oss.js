const axios = require("axios");
const OSS = require("ali-oss");

// 在客户端使用临时访问凭证初始化OSS客户端，用于临时授权访问OSS资源
const getToken = async () => {
  // 设置客户端请求访问凭证的地址。
  await axios.get("http://localhost:8000/sts").then((token) => {
    const client = new OSS({
       // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou
      region: 'oss-cn-hangzhou',
      // 填写步骤1.5生成的临时访问密钥AccessKey ID和AccessKey Secret，非阿里云账号AccessKey ID和AccessKey Secret
      accessKeyId: token.data.AccessKeyId,
      accessKeySecret: token.data.AccessKeySecret,
      // 填写步骤1.5生成的STS安全令牌（SecurityToken）
      stsToken: token.data.SecurityToken,
      authorizationV4: true,
      // 填写Bucket名称
      bucket: "examplebucket",
      // 刷新临时访问凭证
      refreshSTSToken: async () => {
        const refreshToken = await axios.get("http://localhost:8000/sts");
        return {
          accessKeyId: refreshToken.data.AccessKeyId,
          accessKeySecret: refreshToken.data.AccessKeySecret,
          stsToken: refreshToken.data.SecurityToken,
        };
      },
    });
    // 使用临时访问凭证上传文件
    // 填写不包含Bucket名称在内的Object的完整路径，例如exampleobject.jpg
    // 填写本地文件的完整路径，例如D:\\example.jpg
    client.put('exampleobject.jpg', 'D:\\example.jpg').then((res)=>{console.log(res)}).catch(e=>console.log(e))
  });
};
getToken()