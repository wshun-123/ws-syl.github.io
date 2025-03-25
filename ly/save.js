// 从本地存储加载记录
document.addEventListener('DOMContentLoaded', function() {
    loadRecords();
});

// 保存记录到本地存储
function saveRecord() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    
    if (!username || !message) {
        alert('请填写完整信息！');
        return;
    }
    
    // 获取现有记录或初始化空数组
    const records = JSON.parse(localStorage.getItem('userRecords')) || [];
    
    // 添加新记录
    const newRecord = {
        id: Date.now(), // 使用时间戳作为唯一ID
        username: username,
        message: message,
        timestamp: new Date().toLocaleString()
    };
    
    records.push(newRecord);
    localStorage.setItem('userRecords', JSON.stringify(records));
    
    // 清空输入框
    document.getElementById('username').value = '';
    document.getElementById('message').value = '';
    
    // 刷新显示
    loadRecords();
}

