// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Tabs, TabsContent, TabsList, TabsTrigger, Card, CardHeader, CardTitle, CardContent, Avatar, AvatarImage, AvatarFallback, Progress } from '@/components/ui';
// @ts-ignore;
import { User, Activity, Users, Settings, HelpCircle, ChevronRight, Watch } from 'lucide-react';

export default function ProfilePage(props) {
  const {
    $w
  } = props;

  // 模拟数据
  const userInfo = {
    name: '跑步达人',
    avatar: 'https://example.com/avatar.jpg',
    bio: '每周跑3次，半马PB 1小时45分'
  };
  const runningData = {
    week: {
      distance: 28.5,
      progress: 65
    },
    year: {
      distance: 856,
      progress: 72
    }
  };
  const managedGroups = [{
    id: 1,
    name: '周末跑团',
    members: 32
  }, {
    id: 2,
    name: '晨跑小分队',
    members: 15
  }];

  // 设备绑定状态
  const [devices, setDevices] = React.useState([{
    id: 1,
    name: '高驰 Coros',
    connected: false
  }, {
    id: 2,
    name: '佳明 Garmin',
    connected: false
  }]);
  const handleConnectDevice = deviceId => {
    setDevices(devices.map(device => device.id === deviceId ? {
      ...device,
      connected: !device.connected
    } : device));
  };
  return <div className="flex flex-col h-screen">
      {/* 个人信息卡片 */}
      <Card className="m-4">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={userInfo.avatar} />
            <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{userInfo.name}</CardTitle>
            <p className="text-sm text-gray-500">{userInfo.bio}</p>
          </div>
        </CardHeader>
      </Card>

      {/* Tab导航 */}
      <Tabs defaultValue="running" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="running">
            <Activity className="w-4 h-4 mr-2" /> 跑步
          </TabsTrigger>
          <TabsTrigger value="groups">
            <Users className="w-4 h-4 mr-2" /> 跑团
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" /> 设置
          </TabsTrigger>
          <TabsTrigger value="help">
            <HelpCircle className="w-4 h-4 mr-2" /> 帮助
          </TabsTrigger>
        </TabsList>

        {/* 跑步数据 */}
        <TabsContent value="running" className="flex-1 overflow-auto p-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>本周跑步</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span>里程</span>
                <span className="font-bold">{runningData.week.distance} km</span>
              </div>
              <Progress value={runningData.week.progress} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>年度跑步</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span>总里程</span>
                <span className="font-bold">{runningData.year.distance} km</span>
              </div>
              <Progress value={runningData.year.progress} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 跑团管理 */}
        <TabsContent value="groups" className="flex-1 overflow-auto p-4">
          <h3 className="font-semibold mb-4">我管理的跑团</h3>
          {managedGroups.map(group => <Card key={group.id} className="mb-3">
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <p className="text-sm text-gray-500">{group.members}名成员</p>
                </div>
                <ChevronRight className="text-gray-400" />
              </CardHeader>
            </Card>)}
        </TabsContent>

        {/* 设置 */}
        <TabsContent value="settings" className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <span>账号设置</span>
                  <ChevronRight className="text-gray-400" />
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <span>通知设置</span>
                  <ChevronRight className="text-gray-400" />
                </div>
              </CardHeader>
            </Card>
            {/* 新增设备绑定选项 */}
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Watch className="w-5 h-5 mr-2 text-blue-500" />
                    <span>设备绑定</span>
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {devices.map(device => <div key={device.id} className="flex items-center justify-between py-2">
                    <span>{device.name}</span>
                    <button onClick={() => handleConnectDevice(device.id)} className={`px-3 py-1 rounded-full text-sm ${device.connected ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {device.connected ? '已连接' : '连接'}
                    </button>
                  </div>)}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 帮助与反馈 */}
        <TabsContent value="help" className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <span>常见问题</span>
                  <ChevronRight className="text-gray-400" />
                </div>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <span>意见反馈</span>
                  <ChevronRight className="text-gray-400" />
                </div>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 底部导航 */}
      <div className="flex justify-around p-4 border-t">
        <button className="flex flex-col items-center">
          <Activity className="w-6 h-6 text-blue-500" />
          <span className="text-xs mt-1">首页</span>
        </button>
        <button className="flex flex-col items-center">
          <Users className="w-6 h-6" />
          <span className="text-xs mt-1">跑团</span>
        </button>
        <button className="flex flex-col items-center">
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">我的</span>
        </button>
      </div>
    </div>;
}