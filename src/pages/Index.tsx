import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Participant {
  id: number;
  name: string;
  category: string;
  avatar: string;
  wod1_1: { result: string; points: number };
  wod1_2: { result: string; points: number };
  wod2_1: { result: string; points: number };
  wod2_2: { result: string; points: number };
  wod3: { result: string; points: number };
  final: { place: number; points: number };
  totalScore: number;
}

interface ScheduleEvent {
  id: number;
  time: string;
  event: string;
  location: string;
  status: 'upcoming' | 'live' | 'completed';
}

const mockParticipants: Participant[] = [
  { id: 1, name: 'Алексей Иванов', category: 'Мальчики 5-6', avatar: '💪', wod1_1: { result: '45', points: 95 }, wod1_2: { result: '2:15', points: 88 }, wod2_1: { result: '1:45', points: 92 }, wod2_2: { result: '3:20', points: 85 }, wod3: { result: '5:10', points: 90 }, final: { place: 1, points: 100 }, totalScore: 550 },
  { id: 2, name: 'София Петрова', category: 'Девочки 5-6', avatar: '🔥', wod1_1: { result: '42', points: 92 }, wod1_2: { result: '2:20', points: 85 }, wod2_1: { result: '1:50', points: 88 }, wod2_2: { result: '3:25', points: 82 }, wod3: { result: '5:15', points: 87 }, final: { place: 1, points: 100 }, totalScore: 534 },
  { id: 3, name: 'Дмитрий Смирнов', category: 'Мальчики 7-8', avatar: '⚡', wod1_1: { result: '48', points: 98 }, wod1_2: { result: '2:10', points: 90 }, wod2_1: { result: '1:40', points: 95 }, wod2_2: { result: '3:15', points: 87 }, wod3: { result: '5:05', points: 92 }, final: { place: 2, points: 95 }, totalScore: 557 },
  { id: 4, name: 'Анна Волкова', category: 'Девочки 7-8', avatar: '💎', wod1_1: { result: '40', points: 88 }, wod1_2: { result: '2:25', points: 82 }, wod2_1: { result: '1:55', points: 85 }, wod2_2: { result: '3:30', points: 80 }, wod3: { result: '5:20', points: 85 }, final: { place: 2, points: 95 }, totalScore: 515 },
  { id: 5, name: 'Максим Попов', category: 'Мальчики 9-10', avatar: '🦁', wod1_1: { result: '50', points: 100 }, wod1_2: { result: '2:05', points: 92 }, wod2_1: { result: '1:35', points: 98 }, wod2_2: { result: '3:10', points: 90 }, wod3: { result: '5:00', points: 95 }, final: { place: 1, points: 100 }, totalScore: 575 },
  { id: 6, name: 'Мария Соколова', category: 'Девочки 9-10', avatar: '🌟', wod1_1: { result: '44', points: 90 }, wod1_2: { result: '2:18', points: 87 }, wod2_1: { result: '1:48', points: 90 }, wod2_2: { result: '3:22', points: 84 }, wod3: { result: '5:12', points: 88 }, final: { place: 1, points: 100 }, totalScore: 539 },
  { id: 7, name: 'Артём Козлов', category: 'Мальчики 5-6', avatar: '🚀', wod1_1: { result: '43', points: 90 }, wod1_2: { result: '2:22', points: 82 }, wod2_1: { result: '1:52', points: 85 }, wod2_2: { result: '3:28', points: 80 }, wod3: { result: '5:18', points: 85 }, final: { place: 2, points: 95 }, totalScore: 517 },
  { id: 8, name: 'Виктория Новикова', category: 'Девочки 5-6', avatar: '⭐', wod1_1: { result: '38', points: 85 }, wod1_2: { result: '2:30', points: 78 }, wod2_1: { result: '2:00', points: 82 }, wod2_2: { result: '3:35', points: 75 }, wod3: { result: '5:25', points: 80 }, final: { place: 2, points: 95 }, totalScore: 495 },
  { id: 9, name: 'Егор Лебедев', category: 'Мальчики 7-8', avatar: '🏆', wod1_1: { result: '46', points: 95 }, wod1_2: { result: '2:12', points: 88 }, wod2_1: { result: '1:42', points: 92 }, wod2_2: { result: '3:18', points: 85 }, wod3: { result: '5:08', points: 90 }, final: { place: 1, points: 100 }, totalScore: 550 },
  { id: 10, name: 'Полина Морозова', category: 'Девочки 7-8', avatar: '✨', wod1_1: { result: '39', points: 86 }, wod1_2: { result: '2:28', points: 80 }, wod2_1: { result: '1:58', points: 83 }, wod2_2: { result: '3:32', points: 78 }, wod3: { result: '5:22', points: 83 }, final: { place: 3, points: 90 }, totalScore: 500 },
  { id: 11, name: 'Никита Васильев', category: 'Мальчики 9-10', avatar: '⚔️', wod1_1: { result: '49', points: 98 }, wod1_2: { result: '2:08', points: 90 }, wod2_1: { result: '1:38', points: 95 }, wod2_2: { result: '3:12', points: 88 }, wod3: { result: '5:03', points: 93 }, final: { place: 2, points: 95 }, totalScore: 559 },
  { id: 12, name: 'Елизавета Федорова', category: 'Девочки 9-10', avatar: '🌸', wod1_1: { result: '41', points: 88 }, wod1_2: { result: '2:23', points: 83 }, wod2_1: { result: '1:53', points: 87 }, wod2_2: { result: '3:27', points: 81 }, wod3: { result: '5:17', points: 86 }, final: { place: 2, points: 95 }, totalScore: 520 },
];

const mockSchedule: ScheduleEvent[] = [
  { id: 1, time: '09:00', event: 'WOD 1: Fran', location: 'Площадка A', status: 'completed' },
  { id: 2, time: '11:00', event: 'WOD 2: Cindy', location: 'Площадка B', status: 'live' },
  { id: 3, time: '14:00', event: 'WOD 3: Diane', location: 'Площадка A', status: 'upcoming' },
  { id: 4, time: '16:00', event: 'WOD 4: Helen', location: 'Площадка C', status: 'upcoming' },
  { id: 5, time: '18:00', event: 'Финал', location: 'Главная арена', status: 'upcoming' },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Девочки 5-6');

  const filteredParticipants = mockParticipants
    .filter(p => p.category === selectedCategory)
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8 space-y-12">
        
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary p-12 text-white animate-fade-in">
          <div className="relative z-10 text-center space-y-6">
            <div className="inline-block animate-pulse-glow">
              <Badge className="text-lg px-6 py-2 bg-white/20 hover:bg-white/30 border-white/40">
                <Icon name="Trophy" size={20} className="mr-2" />
                CROSSFIT CHAMPIONSHIP 2025
              </Badge>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
              БИТВА СИЛЬНЕЙШИХ
            </h1>
            <p className="text-xl md:text-2xl font-medium opacity-90 max-w-2xl mx-auto">
              Следи за результатами в реальном времени
            </p>
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-5xl font-bold">{mockParticipants.length}</div>
                <div className="text-sm opacity-80 uppercase tracking-wide">Участников</div>
              </div>
              <div className="h-16 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-5xl font-bold">{mockSchedule.length}</div>
                <div className="text-sm opacity-80 uppercase tracking-wide">Упражнений</div>
              </div>
              <div className="h-16 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-5xl font-bold animate-pulse">LIVE</div>
                <div className="text-sm opacity-80 uppercase tracking-wide">Прямой эфир</div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/10"></div>
        </section>

        <Tabs defaultValue="results" className="space-y-8 animate-fade-in">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-14">
            <TabsTrigger value="results" className="text-base font-semibold">
              <Icon name="BarChart3" size={20} className="mr-2" />
              Результаты
            </TabsTrigger>
            <TabsTrigger value="participants" className="text-base font-semibold">
              <Icon name="Users" size={20} className="mr-2" />
              Участники
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-base font-semibold">
              <Icon name="Calendar" size={20} className="mr-2" />
              Расписание
            </TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-6">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                variant={selectedCategory === 'Девочки 5-6' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Девочки 5-6')}
                className="font-semibold"
              >
                Девочки 5-6
              </Button>
              <Button 
                variant={selectedCategory === 'Девочки 7-8' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Девочки 7-8')}
              >
                Девочки 7-8
              </Button>
              <Button 
                variant={selectedCategory === 'Девочки 9-10' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Девочки 9-10')}
              >
                Девочки 9-10
              </Button>
              <Button 
                variant={selectedCategory === 'Мальчики 5-6' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Мальчики 5-6')}
              >
                Мальчики 5-6
              </Button>
              <Button 
                variant={selectedCategory === 'Мальчики 7-8' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Мальчики 7-8')}
              >
                Мальчики 7-8
              </Button>
              <Button 
                variant={selectedCategory === 'Мальчики 9-10' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Мальчики 9-10')}
              >
                Мальчики 9-10
              </Button>
            </div>

            <Card className="animate-fade-in">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase">Место</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase">Участник</th>
                        <th className="px-4 py-3 text-center text-xs font-bold uppercase">1.1</th>
                        <th className="px-4 py-3 text-center text-xs font-bold uppercase">1.2</th>
                        <th className="px-4 py-3 text-center text-xs font-bold uppercase">2.1</th>
                        <th className="px-4 py-3 text-center text-xs font-bold uppercase">2.2</th>
                        <th className="px-4 py-3 text-center text-xs font-bold uppercase">3</th>
                        <th className="px-4 py-3 text-center text-xs font-bold uppercase">Финал</th>
                        <th className="px-4 py-3 text-right text-xs font-bold uppercase">Итого</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredParticipants.map((participant, index) => (
                        <tr 
                          key={participant.id}
                          className="hover:bg-muted/50 transition-colors duration-200"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={
                                index === 0 ? 'text-2xl font-extrabold text-primary' :
                                index === 1 ? 'text-xl font-bold text-secondary' :
                                index === 2 ? 'text-lg font-bold text-accent' :
                                'text-lg font-semibold text-muted-foreground'
                              }>
                                #{index + 1}
                              </div>
                              {index < 3 && (
                                <Icon 
                                  name={index === 0 ? 'Trophy' : index === 1 ? 'Medal' : 'Award'} 
                                  size={20}
                                  className={index === 0 ? 'text-primary' : index === 1 ? 'text-secondary' : 'text-accent'}
                                />
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="text-2xl">{participant.avatar}</div>
                              <div className="font-bold text-base">{participant.name}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="font-semibold">{participant.wod1_1.result}</div>
                            <div className="text-xs text-muted-foreground">({participant.wod1_1.points})</div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="font-semibold">{participant.wod1_2.result}</div>
                            <div className="text-xs text-muted-foreground">({participant.wod1_2.points})</div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="font-semibold">{participant.wod2_1.result}</div>
                            <div className="text-xs text-muted-foreground">({participant.wod2_1.points})</div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="font-semibold">{participant.wod2_2.result}</div>
                            <div className="text-xs text-muted-foreground">({participant.wod2_2.points})</div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="font-semibold">{participant.wod3.result}</div>
                            <div className="text-xs text-muted-foreground">({participant.wod3.points})</div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="font-semibold">{participant.final.place} место</div>
                            <div className="text-xs text-muted-foreground">({participant.final.points})</div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="text-xl font-bold text-primary">{participant.totalScore}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockParticipants.map((participant, index) => (
                <Card 
                  key={participant.id}
                  className="hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{participant.avatar}</div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{participant.name}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="font-semibold">
                            {participant.category}
                          </Badge>
                          <Badge className="bg-secondary">
                            {participant.team}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-1">Текущий счёт</div>
                      <div className="text-3xl font-bold text-primary">{participant.score}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="CalendarDays" size={28} />
                  Программа соревнований
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSchedule.map((event, index) => (
                  <div 
                    key={event.id}
                    className="flex items-center gap-6 p-5 rounded-xl border-2 hover:shadow-lg transition-all duration-300 animate-slide-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-center min-w-[80px]">
                      <div className="text-3xl font-bold text-primary">{event.time}</div>
                    </div>
                    <div className="h-16 w-px bg-border"></div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xl mb-1">{event.event}</h4>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Icon name="MapPin" size={16} />
                        {event.location}
                      </p>
                    </div>
                    <Badge 
                      className={
                        event.status === 'live' 
                          ? 'bg-secondary animate-pulse text-base px-4 py-2' 
                          : event.status === 'completed'
                          ? 'bg-muted text-muted-foreground text-base px-4 py-2'
                          : 'bg-primary text-base px-4 py-2'
                      }
                    >
                      {event.status === 'live' && <Icon name="Radio" size={16} className="mr-2" />}
                      {event.status === 'completed' && <Icon name="Check" size={16} className="mr-2" />}
                      {event.status === 'upcoming' && <Icon name="Clock" size={16} className="mr-2" />}
                      {event.status === 'live' ? 'В эфире' : event.status === 'completed' ? 'Завершено' : 'Скоро'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}