#/bin/bash
echo '原始进程号:'
ps aux | grep "vue-cli-service serve" | awk '{print $2}' | head -1
ps aux | grep "vue-cli-service serve" | awk '{print $2}' | head -1 | xargs kill
echo '杀死原始进程成功, 准备拉起新进程...'
nohup npm run dev > log/access.log 2>&1 & disown
sleep 2
echo '新进程启动成功, 进程号:'
ps aux | grep "vue-cli-service serve" | awk '{print $2}' | head -1
