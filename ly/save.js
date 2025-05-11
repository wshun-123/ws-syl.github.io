document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('textForm');
    const resultDiv = document.getElementById('result');
    const issuesList = document.getElementById('issuesList');
    
    // 配置信息 - 替换为你的实际信息
    const config = {
        username: 'wshun-123',
        repo: 'ws-syl.github.io',
        labels: 'user-content' // 可选：为这些提交添加特定标签
    };
    
    // 表单提交处理
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const content = document.getElementById('content').value.trim();
        
        if (!content) {
            resultDiv.innerHTML = '<p style="color:red;">请输入内容</p>';
            return;
        }
        
        // 创建GitHub Issue URL
        const issueUrl = `https://github.com/${config.username}/${config.repo}/issues/new?` + 
                         `title=${encodeURIComponent('用户提交的文本')}` +
                         `&body=${encodeURIComponent(content)}` +
                         (config.labels ? `&labels=${encodeURIComponent(config.labels)}` : '');
        
        // 打开新窗口让用户确认提交
        window.open(issueUrl, '_blank');
        
        // 清空表单并显示成功消息
        form.reset();
        resultDiv.innerHTML = '<p style="color:green;">请在GitHub页面确认提交！</p>';
        
        // 稍后刷新问题列表
        setTimeout(loadIssues, 2000);
    });
    
    // 加载已存在的Issues
    function loadIssues() {
        fetch(`https://api.github.com/repos/${config.username}/${config.repo}/issues?labels=${config.labels || ''}`)
            .then(response => response.json())
            .then(issues => {
                if (issues.length === 0) {
                    issuesList.innerHTML = '<p>暂无存储的内容</p>';
                    return;
                }
                
                let html = '';
                issues.forEach(issue => {
                    html += `
                        <div class="issue">
                            <h3>#${issue.number} - ${new Date(issue.created_at).toLocaleString()}</h3>
                            <p>${issue.body.replace(/\n/g, '<br>')}</p>
                            <a href="${issue.html_url}" target="_blank">在GitHub上查看</a>
                        </div>
                    `;
                });
                
                issuesList.innerHTML = html;
            })
            .catch(error => {
                console.error('加载Issues失败:', error);
                issuesList.innerHTML = '<p>加载内容失败，请刷新重试</p>';
            });
    }
    
    // 初始加载
    loadIssues();
});

