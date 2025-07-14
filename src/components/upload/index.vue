<template>
  <el-upload action="" class="upload-demo" :auto-upload="false" :limit="1" :file-list="fileList" :on-change="handleFileChange" :on-remove="handleRemove" :show-file-list="true">
    <el-button type="primary" size="mini">上传数据</el-button>
  </el-upload>
</template>

<script>
import OSS from "ali-oss";
import path from "path";
import { get, post } from '@/utils/http'

export default {
  props: {
    currentPath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [],
      client: null,
      url: '/v1/oss/getUploadStsToken',
      allowedPath: ''
    };
  },
  methods: {
    reload() {
      this.fileList = []
    },
    handleFileChange(files) {
      console.log('file', files)
      const file = files.raw;
      const originalFilename = files.name;
      // 生成UUID作为文件名前缀
      const uuid = files.uid;
      // 获取文件扩展名
      const fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.'));
      // 组合新的文件名：UUID + 原始扩展名
      const uniqueFilename = uuid + fileExtension;

      fetch(import.meta.env.VITE_API_BASE_URL + "/get_post_signature_for_oss_upload", { method: "GET" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("获取签名失败");
          }
          return response.json();
        })
        .then((data) => {
          const formData = new FormData();
          formData.append("name", uniqueFilename); // 使用唯一文件名
          formData.append("policy", data.policy);
          formData.append("OSSAccessKeyId", data.ossAccessKeyId);
          formData.append("success_action_status", "200");
          formData.append("signature", data.signature);
          formData.append("key", data.dir + uniqueFilename); // 使用唯一文件名
          formData.append("file", file);
          console.log('最终key:' + data.dir + uniqueFilename)
          return fetch(data.host, { method: "POST", body: formData });
        })
        .then((response) => {
          if (response.ok) {
            this.$emit("uploadSuccess", originalFilename, uniqueFilename, uuid);
            console.log("上传成功", response, uniqueFilename);
            // alert("文件已上传");
          } else {
            console.log("上传失败", response);
            alert("上传失败，请稍后再试");
          }
        })
        .catch((error) => {
          console.error("发生错误:", error);
        });
    },
    // 获取临时 token 并初始化 ali-oss 客户端
    async initOSSClient(fileName) {
      // /v1//oss/getUploadStsToken
      const res = await get(this.url);

      const { accessKeyId, accessKeySecret, securityToken, bucketName, region, allowedPath } = res.data;
      // console.log('获取临时 token：', res.data, accessKeyId, accessKeySecret, securityToken);
      this.allowedPath = allowedPath
      this.client = new OSS({
        region: region,
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        stsToken: securityToken,
        authorizationV4: true,
        bucket: bucketName,
        secure: true,
        timeout: 100000000
      });
    },
    // 文件变化时：自动上传
    async handleFileChange1(file, fileList) {
      this.fileList = fileList.slice(-1); // 只保留一个文件
      const rawFile = file.raw;

      // 初始化 OSS 客户端
      if (!this.client) {
        await this.initOSSClient(rawFile.name);
      }

      // 自定义文件名，可加时间戳避免重复
      const url = path.join(this.allowedPath, this.currentPath, rawFile.name);

      try {
        const result = await this.client.put(url, rawFile);
        this.$message.success("上传成功！");
        this.$emit("uploadSuccess", result.url);
        console.log("上传结果：", result);
      } catch (err) {
        this.$message.error("上传失败！");
        console.error("OSS 上传失败：", err);
      }
      this.fileList = []
    },

    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
  },
};
</script>
