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

// 加载并显示所有记录
function loadRecords() {
    const records = JSON.parse(localStorage.getItem('userRecords')) || [];
    const recordList = document.getElementById('record-list');
    
    recordList.innerHTML = '';
    
    if (records.length === 0) {
        recordList.innerHTML = '<p>暂无记录</p>';
        return;
    }
    
    // 按时间倒序排列
    records.sort((a, b) => b.id - a.id).forEach(record => {
        const recordItem = document.createElement('div');
        recordItem.className = 'record-item';
        recordItem.innerHTML = `
            <p><strong>${record.username}</strong> <small>${record.timestamp}</small></p>
            <p>${record.message}</p>
            <button onclick="deleteRecord(${record.id})">删除</button>
        `;
        recordList.appendChild(recordItem);
    });
}

// 删除记录
function deleteRecord(id) {
    let records = JSON.parse(localStorage.getItem('userRecords')) || [];
    records = records.filter(record => record.id !== id);
    localStorage.setItem('userRecords', JSON.stringify(records));
    loadRecords();
}