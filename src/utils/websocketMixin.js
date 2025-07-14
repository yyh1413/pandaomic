import { downloadFile } from './download'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      ws: null // WebSocket实例
    }
  },
  provide() {
    return {
      downResultFuntion: this.downResultFuntion
    }
  },
  mounted() {
    this.initScriptInfo();
  },
  methods: {

    async initScriptInfo(){
      if (this.$route.params.scriptInfo) {
        this.scriptInfo = this.$route.params.scriptInfo
      } else {
        await this.queryScriptInfoByRoute();
      }

      this.$nextTick(() => {
        this.refreshAnalysisResultView()
      })
    },

    async queryScriptInfoByRoute() {
      
    },

    downResultFuntion(row) {
      if (row.scriptExecuteRecordStatus !== '1') {
        this.$message.warning('仅执行成功的记录可以下载结果')
        return
      }
      if (!row.result) {
        this.$message.warning('没有可下载结果')
        return
      }
      const { code, data } = JSON.parse(row.result)
      if (code === 200) {

        const arr = data?.['zipPath']?.split('/') ?? []

        const fileName = arr[arr.length - 1] ?? 'result';  // 获取文件名
        const fileBaseName = fileName.split('.')[0];  // 获取文件名不包含扩展名的部分
        const fileExtension = fileName.split('.').pop();  // 获取文件扩展名
        const downloadName = `${fileBaseName}${dayjs().format('YYYY-MM-DD HH-mm-ss')}.${fileExtension}`; // 拼接成目标格式

        downloadFile(data?.['zipPath'], downloadName)
      }
    },
    handleWebSocketMessage(res) {
      console.log('WebSocket 收到数据:', res)

      if (res.code === 200) {
        this.userUploadInfoResp = res.data
      } else {
      }

      // 调用子组件的 init 方法刷新数据
      this.refreshAnalysisResultView()
    },

    refreshAnalysisResultView() {
      this.$refs.visualizationLayout.refreshAnalysisResultView()
    },
    createWebSocket(userUploadInfoId) {
      // 初始化列表
      this.refreshAnalysisResultView()


      this.$message.info('正在等待执行结果')

      const baseUrl = process.env.VUE_APP_WEBSOCKET_URL || '';

      const wsUrl = `${baseUrl.replace("http", "ws")}/prod-api/websocket/script/`;

      console.log("--ws url--", wsUrl)

      // 创建 WebSocket 连接
      this.ws = new WebSocket(wsUrl + userUploadInfoId)

      // WebSocket 打开时的回调
      this.ws.onopen = (event) => {
        console.log('WebSocket 连接已打开')
      }

      // WebSocket 接收到消息时的回调
      this.ws.onmessage = (event) => {
        console.warn(event, '999--9')
        // socket请求完成后，处理msg
        this.handleWebSocketMessage(event)
        // 关闭 loading
        if (this.loadingInstance) {
          // 当连接完成时，关闭弹窗
          this.loadingInstance.close()
        }
      }

      // WebSocket 关闭时的回调
      this.ws.onclose = (event) => {
        console.log('WebSocket 连接已关闭')
        // 如果需要可以在这里处理重连逻辑
      }

      // WebSocket 出错时的回调
      this.ws.onerror = (error) => {
        console.error('WebSocket 出现错误:', error)
      }
    },
    closeWebSocket() {
      if (this.ws) {
        this.ws.close() // 关闭 WebSocket 连接
      }
    }
  },
  beforeDestroy() {
    this.closeWebSocket() // 组件销毁时断开连接
  }
}
