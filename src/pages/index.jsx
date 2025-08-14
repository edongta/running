// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
// @ts-ignore;
import { Activity, Users, Award, ChevronRight, BarChart2 } from 'lucide-react';

export default function HomePage(props) {
  const {
    $w
  } = props;

  // 模拟数据
  const monthlyData = {
    distance: 128.5,
    duration: '18h 45m',
    pace: '5\'45"',
    progress: 75
  };
  const runningStats = {
    days: 15,
    totalDuration: '56h 22m',
    elevation: 1250,
    calories: 8560,
    avgCadence: 172,
    avgStride: 1.2,
    avgDistance: 8.6,
    avgDuration: '1h 12m'
  };
  const groups = [{
    id: 1,
    name: '周末跑团',
    members: 32,
    active: '高'
  }];
  const rankings = [{
    rank: 1,
    name: '张三',
    distance: 42.3
  }];
  const handleViewMonthlyDetail = () => {
    $w.utils.navigateTo({
      pageId: 'monthlyStats',
      params: {}
    });
  };
  const handleViewAllStats = () => {
    $w.utils.navigateTo({
      pageId: 'runningStats',
      params: {}
    });
  };
  return <div className="p-4 space-y-6 bg-black text-gray-200">
      {/* 本月跑步数据卡片 - 保持原有红色背景 */}
      <Card className="bg-red-800 cursor-pointer hover:bg-red-900" onClick={handleViewMonthlyDetail}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-white" />
            <CardTitle className="text-white">本月跑步数据</CardTitle>
          </div>
          <ChevronRight className="text-gray-200" />
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center text-white">
          <div>
            <div className="text-xl font-bold">{monthlyData.distance}km</div>
            <div className="text-xs text-gray-200">里程</div>
          </div>
          <div>
            <div className="text-xl font-bold">{monthlyData.duration}</div>
            <div className="text-xs text-gray-200">时长</div>
          </div>
          <div>
            <div className="text-xl font-bold">{monthlyData.pace}</div>
            <div className="text-xs text-gray-200">配速</div>
          </div>
        </CardContent>
      </Card>

      {/* 跑步统计部分 - 保持原有黄色背景 */}
      <Card className="bg-amber-200">
        <div className="p-4 flex justify-start">
          <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800" onClick={handleViewAllStats}>
            <BarChart2 className="w-4 h-4 mr-2" />
            跑步统计
          </Button>
        </div>
        <CardContent className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2">
            <div className="text-lg font-medium">{runningStats.days}天</div>
            <div className="text-xs text-gray-500">跑步天数</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-medium">{runningStats.totalDuration}</div>
            <div className="text-xs text-gray-500">总时长</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-medium">{runningStats.elevation}m</div>
            <div className="text-xs text-gray-500">总爬升</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-medium">{runningStats.calories}</div>
            <div className="text-xs text-gray-500">总消耗</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-medium">{runningStats.avgCadence}</div>
            <div className="text-xs text-gray-500">平均步频</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-medium">{runningStats.avgStride}m</div>
            <div className="text-xs text-gray-500">平均步幅</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-medium">{runningStats.avgDistance}km</div>
            <div className="text-xs text-gray-500">平均距离</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-medium">{runningStats.avgDuration}</div>
            <div className="text-xs text-gray-500">平均时长</div>
          </div>
        </CardContent>
      </Card>

      {/* 跑团列表 - 深灰色背景 */}
      <Card className="bg-gray-900">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-orange-400" />
            <CardTitle className="text-gray-200">我的跑团</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {groups.map(group => <div key={group.id} className="p-3 border border-gray-700 rounded-lg hover:bg-gray-800 cursor-pointer">
              <div className="flex justify-between">
                <span className="font-medium text-gray-200">{group.name}</span>
                <span className="text-sm text-gray-400">{group.members}人</span>
              </div>
              <div className="text-sm text-gray-400">活跃度: {group.active}</div>
            </div>)}
        </CardContent>
      </Card>

      {/* 排行榜 - 深灰色背景 */}
      <Card className="bg-gray-900">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <CardTitle className="text-gray-200">本周排行榜</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th>排名</th>
                <th>姓名</th>
                <th className="text-right">里程(km)</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map(item => <tr key={item.rank} className="border-t border-gray-700">
                  <td className="py-2 text-gray-200">{item.rank}</td>
                  <td className="text-gray-200">{item.name}</td>
                  <td className="text-right text-gray-200">{item.distance}</td>
                </tr>)}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>;
}