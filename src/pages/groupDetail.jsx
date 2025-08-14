// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Tabs, TabsContent, TabsList, TabsTrigger, Avatar, AvatarImage, AvatarFallback, Button, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, Input, Textarea, Label, useToast } from '@/components/ui';
// @ts-ignore;
import { Calendar, Users, ChevronRight, Plus, Image, BarChart2, Settings } from 'lucide-react';

export default function GroupDetail(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('info');
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cover: ''
  });
  const {
    toast
  } = useToast();

  // 模拟数据
  const groupInfo = {
    name: '周末跑团',
    cover: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500',
    members: 32,
    activeLevel: '高',
    description: '每周六早上7点准时开跑，欢迎加入！'
  };
  const members = [{
    id: 1,
    name: '张三',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: '团长'
  }, {
    id: 2,
    name: '李四',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    role: '成员'
  }];
  const activities = [{
    id: 1,
    date: '2023-08-19',
    distance: '10km',
    location: '世纪公园'
  }, {
    id: 2,
    date: '2023-08-12',
    distance: '8km',
    location: '徐汇滨江'
  }];
  const stats = {
    totalDistance: '256km',
    avgDistance: '8.5km',
    totalMembers: 32,
    activeMembers: 24
  };
  const handleCreateGroup = async () => {
    try {
      setIsCreating(true);
      // 实际调用数据模型
      // const result = await $w.cloud.callDataSource({
      //   dataSourceName: 'running_groups',
      //   methodName: 'wedaCreateV2',
      //   params: { data: formData }
      // });

      toast({
        title: '创建成功',
        description: `${formData.name}跑团已创建`
      });
      $w.utils.navigateTo({
        pageId: 'groupDetail',
        params: {
          groupId: 'new-group-id'
        }
      });
    } catch (error) {
      toast({
        title: '创建失败',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsCreating(false);
    }
  };
  return <div className="flex flex-col h-screen bg-gray-100">
      {/* 跑团封面 */}
      <div className="relative h-48">
        <img src={groupInfo.cover} alt="跑团封面" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h1 className="text-2xl font-bold text-white">{groupInfo.name}</h1>
          <p className="text-gray-200">{groupInfo.members}位成员 · {groupInfo.activeLevel}活跃度</p>
        </div>
      </div>

      {/* 跑团导航 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="info" className="flex-1">
            <Users className="w-4 h-4 mr-1" /> 详情
          </TabsTrigger>
          <TabsTrigger value="members" className="flex-1">
            <Users className="w-4 h-4 mr-1" /> 成员
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex-1">
            <Calendar className="w-4 h-4 mr-1" /> 活动
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex-1">
            <BarChart2 className="w-4 h-4 mr-1" /> 数据
          </TabsTrigger>
        </TabsList>

        {/* 跑团详情 */}
        <TabsContent value="info" className="p-4">
          <div className="bg-white rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">跑团介绍</h2>
            <p className="text-gray-600">{groupInfo.description}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">基本信息</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">创建时间</p>
                <p className="font-medium">2023-01-15</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">团长</p>
                <p className="font-medium">张三</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 成员列表 */}
        <TabsContent value="members" className="p-4">
          <div className="bg-white rounded-lg">
            {members.map(member => <div key={member.id} className="p-3 flex items-center border-b">
                <Avatar className="mr-3">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>)}
          </div>
        </TabsContent>

        {/* 活动列表 */}
        <TabsContent value="activities" className="p-4">
          <div className="bg-white rounded-lg">
            {activities.map(activity => <div key={activity.id} className="p-3 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{activity.date}</p>
                    <p className="text-sm text-gray-500">{activity.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{activity.distance}</p>
                    <Button variant="ghost" size="sm">报名</Button>
                  </div>
                </div>
              </div>)}
          </div>
        </TabsContent>

        {/* 数据统计 */}
        <TabsContent value="stats" className="p-4">
          <div className="bg-white rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold mb-4">跑团数据</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">总里程</p>
                <p className="text-xl font-bold">{stats.totalDistance}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">平均距离</p>
                <p className="text-xl font-bold">{stats.avgDistance}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">总成员</p>
                <p className="text-xl font-bold">{stats.totalMembers}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">活跃成员</p>
                <p className="text-xl font-bold">{stats.activeMembers}</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* 底部操作栏 */}
      <div className="p-4 bg-white border-t flex space-x-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              <Plus className="w-4 h-4 mr-2" /> 创建跑团
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>创建新跑团</DialogTitle>
              <DialogDescription>填写跑团基本信息，创建后可以邀请好友加入</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  名称
                </Label>
                <Input id="name" value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cover" className="text-right">
                  封面图
                </Label>
                <Input id="cover" value={formData.cover} onChange={e => setFormData({
                ...formData,
                cover: e.target.value
              })} className="col-span-3" placeholder="输入图片URL" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  描述
                </Label>
                <Textarea id="description" value={formData.description} onChange={e => setFormData({
                ...formData,
                description: e.target.value
              })} className="col-span-3" rows={3} />
              </div>
            </div>
            <Button onClick={handleCreateGroup} disabled={isCreating || !formData.name}>
              {isCreating ? '创建中...' : '确认创建'}
            </Button>
          </DialogContent>
        </Dialog>
        
        <Button className="flex-1">
          加入跑团
        </Button>
      </div>
    </div>;
}