# WiLearning
WiLearning 是一个开源、免费的在线学习及视频会议系统。WiLearning音视频模块使用了WebRTC技术，服务器端使用Typescript + Nodejs + MediaSoup开发,Web端使用Angular + Angular Material，目前具备以下功能：
* 多人视频会议 - 进行多人实时音视频及文字互动
* 共享桌面 - 共享自己的桌面内容
* 共享媒体 - 共享自己电脑上的音频或视频
* 共享课件 - 共享pdf文件，pdf文件在客户端自动转码
* 实时画笔 - 课件批注、添加内容，并共享给其他参与人
* 视频滤镜、设置logo、公告等功能
* 同时支持多个房间 - 可支持任意多个房间，每个房间参与人数不限定，最终取决于硬件条件
* 多语言支持 - 目前支持中文和英文，可扩展
* 稳定 - 切换网络时自动恢复
* 独立部署 - 安装简单,对外部工具没有依赖，可以独立部署于Linux/Mac服务器上
* 全终端支持 - 支持PC/Android/IOS平台，自动适配Pad平板电脑

# 安装
支持Linux/Mac操作系统,要求Nodejs版本大于V12.
```
npm install -g cnpm

# 构建所有
./build.sh all

# 只构建Web端，支持单独构建server/web/admin
./build.sh web
```

# 运行
代码里提供了示例SSL证书,实际运行时,请提供自己的证书,证书要与访问域名一致.
```
cd dist

# 方法一： 运行server
node server.js --cert ../certs/rtc.liweix.com.pem --key ../certs/rtc.liweix.com.key

# 如果获取公网IP地址失败,则可以使用--publicIp 手动提供公网IP地址
node server.js --cert ../certs/rtc.liweix.com.pem --key ../certs/rtc.liweix.com.key --publicIp x.x.x.x

# 方法二： 直接运行start.sh(使用默认证书)
./start.sh
```
![Admin 截图](res/admin.png?raw=true)
![Web 截图](res/web.png?raw=true)

## 浏览器访问
WiLearning 支持Chrome、FireFox、Safari浏览器，推荐使用最新版本的Chrome浏览器。
在浏览器中打开admin地址:
```
https://x.x.x.x/admin/
```

在Admin界面创建房间,通过Admin界面跳转到房间地址，多人登录到同一个房间即可开始视频会议。

# 支持WiLearning
毫无疑问，WiLearning的成长需要你的支持，你可以通过以下方式支持WiLearning：
* 使用WiLearning，提Bug以及改进建议
* 提需求。我们不一定会接受所有需求，但所有需求都会认真分析并给予回复
* 将WiLearning推荐给你的同事或老板，并为WiLearning加颗星

# Roadmap
我们的愿景是打造一个面向未来的远程办公、远程教学私有云系统，它应该具备以下特性：
* 易于部署和使用
* 高质量音视频通话，能够兼容多种网络
* 提供一套适用于远程办公的协同工具
* 在实时音视频中整合VR/AR，提供超出现实的视觉效果


# 技术交流
加QQ群: 1043056267, 验证信息里请注明WiLearning
