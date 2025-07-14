export function downloadFile(url,downloadName){
  if (url===undefined||url===''){
    this.$message({message: '暂无下载文件',type: 'warning'});
    return;
  }
  const a = document.createElement('a');
  a.href = url; // 文件链接
  a.download = downloadName;
  a.click();
  a.remove();
}
