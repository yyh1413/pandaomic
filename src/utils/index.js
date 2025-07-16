export const parseApiResponse = function (apiResponse) {
  try {
    // 提取基因表达数据
    console.log(apiResponse);
    const outputData = apiResponse.outputs[0].outputs[0].results.message.text;
   
    return JSON.parse(outputData);
  } catch (error) {
    console.error('解析API响应失败:', error);
    return [];
  }
}