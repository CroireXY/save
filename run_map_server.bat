@echo off
:: 设置你地图数据的路径（请根据实际路径修改）
set "MAP_PATH=C:\Users\sun.ruiqi\LAE_dashboard\code\map"

:: 设置端口
set "PORT=9000"

:: 打印提示
echo Starting Cesium map server...
echo Serving files from: %MAP_PATH%
echo Listening on: http://localhost:%PORT%/

:: 启动 http-server
echo Starting Cesium map server with CORS enabled...
start http-server "%MAP_PATH%" -p %PORT% --cors

:: 自动打开浏览器
:: start http://localhost:%PORT%/

pause
