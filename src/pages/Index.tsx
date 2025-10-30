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
  event: string;
  heats: { time: string; category: string }[];
  status: 'upcoming' | 'live' | 'completed';
}

const mockParticipants: Participant[] = [
  { id: 1, name: 'Алексей Иванов', category: 'Новички МЖ', avatar: '💪', wod1_1: { result: '45', points: 95 }, wod1_2: { result: '2:15', points: 88 }, wod2_1: { result: '1:45', points: 92 }, wod2_2: { result: '3:20', points: 85 }, wod3: { result: '5:10', points: 90 }, final: { place: 1, points: 100 }, totalScore: 550 },
  { id: 2, name: 'София Петрова', category: 'Новички МЖ', avatar: '🔥', wod1_1: { result: '42', points: 92 }, wod1_2: { result: '2:20', points: 85 }, wod2_1: { result: '1:50', points: 88 }, wod2_2: { result: '3:25', points: 82 }, wod3: { result: '5:15', points: 87 }, final: { place: 1, points: 100 }, totalScore: 534 },
  { id: 3, name: 'Дмитрий Смирнов', category: 'Новички МЖ+', avatar: '⚡', wod1_1: { result: '48', points: 98 }, wod1_2: { result: '2:10', points: 90 }, wod2_1: { result: '1:40', points: 95 }, wod2_2: { result: '3:15', points: 87 }, wod3: { result: '5:05', points: 92 }, final: { place: 2, points: 95 }, totalScore: 557 },
  { id: 4, name: 'Анна Волкова', category: 'Новички МЖ+', avatar: '💎', wod1_1: { result: '40', points: 88 }, wod1_2: { result: '2:25', points: 82 }, wod2_1: { result: '1:55', points: 85 }, wod2_2: { result: '3:30', points: 80 }, wod3: { result: '5:20', points: 85 }, final: { place: 2, points: 95 }, totalScore: 515 },
  { id: 5, name: 'Максим Попов', category: 'Команды Про', avatar: '🦁', wod1_1: { result: '50', points: 100 }, wod1_2: { result: '2:05', points: 92 }, wod2_1: { result: '1:35', points: 98 }, wod2_2: { result: '3:10', points: 90 }, wod3: { result: '5:00', points: 95 }, final: { place: 1, points: 100 }, totalScore: 575 },
  { id: 6, name: 'Мария Соколова', category: 'Команды Про', avatar: '🌟', wod1_1: { result: '44', points: 90 }, wod1_2: { result: '2:18', points: 87 }, wod2_1: { result: '1:48', points: 90 }, wod2_2: { result: '3:22', points: 84 }, wod3: { result: '5:12', points: 88 }, final: { place: 1, points: 100 }, totalScore: 539 },
  { id: 7, name: 'Артём Козлов', category: 'Новички МЖ', avatar: '🚀', wod1_1: { result: '43', points: 90 }, wod1_2: { result: '2:22', points: 82 }, wod2_1: { result: '1:52', points: 85 }, wod2_2: { result: '3:28', points: 80 }, wod3: { result: '5:18', points: 85 }, final: { place: 2, points: 95 }, totalScore: 517 },
  { id: 8, name: 'Виктория Новикова', category: 'Новички МЖ', avatar: '⭐', wod1_1: { result: '38', points: 85 }, wod1_2: { result: '2:30', points: 78 }, wod2_1: { result: '2:00', points: 82 }, wod2_2: { result: '3:35', points: 75 }, wod3: { result: '5:25', points: 80 }, final: { place: 2, points: 95 }, totalScore: 495 },
  { id: 9, name: 'Егор Лебедев', category: 'Новички МЖ+', avatar: '🏆', wod1_1: { result: '46', points: 95 }, wod1_2: { result: '2:12', points: 88 }, wod2_1: { result: '1:42', points: 92 }, wod2_2: { result: '3:18', points: 85 }, wod3: { result: '5:08', points: 90 }, final: { place: 1, points: 100 }, totalScore: 550 },
  { id: 10, name: 'Полина Морозова', category: 'Новички МЖ+', avatar: '✨', wod1_1: { result: '39', points: 86 }, wod1_2: { result: '2:28', points: 80 }, wod2_1: { result: '1:58', points: 83 }, wod2_2: { result: '3:32', points: 78 }, wod3: { result: '5:22', points: 83 }, final: { place: 3, points: 90 }, totalScore: 500 },
  { id: 11, name: 'Никита Васильев', category: 'Команды Про', avatar: '⚔️', wod1_1: { result: '49', points: 98 }, wod1_2: { result: '2:08', points: 90 }, wod2_1: { result: '1:38', points: 95 }, wod2_2: { result: '3:12', points: 88 }, wod3: { result: '5:03', points: 93 }, final: { place: 2, points: 95 }, totalScore: 559 },
  { id: 12, name: 'Елизавета Федорова', category: 'Команды Про', avatar: '🌸', wod1_1: { result: '41', points: 88 }, wod1_2: { result: '2:23', points: 83 }, wod2_1: { result: '1:53', points: 87 }, wod2_2: { result: '3:27', points: 81 }, wod3: { result: '5:17', points: 86 }, final: { place: 2, points: 95 }, totalScore: 520 },
];

const mockSchedule: ScheduleEvent[] = [
  { 
    id: 1, 
    event: 'Комплекс 1', 
    heats: [
      { time: '09:00', category: 'Новички МЖ' },
      { time: '09:30', category: 'Новички МЖ+' },
      { time: '10:00', category: 'Команды Про' },
    ],
    status: 'completed' 
  },
  { 
    id: 2, 
    event: 'Комплекс 2', 
    heats: [
      { time: '12:00', category: 'Новички МЖ' },
      { time: '12:30', category: 'Новички МЖ+' },
      { time: '13:00', category: 'Команды Про' },
    ],
    status: 'live' 
  },
  { 
    id: 3, 
    event: 'Комплекс 3', 
    heats: [
      { time: '15:00', category: 'Новички МЖ' },
      { time: '15:30', category: 'Новички МЖ+' },
      { time: '16:00', category: 'Команды Про' },
    ],
    status: 'upcoming' 
  },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Новички МЖ');
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const filteredParticipants = mockParticipants
    .filter(p => p.category === selectedCategory)
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://cdn.poehali.dev/files/86dd6813-c6ff-44a0-b096-65eed9be5cdb.jpeg)' }}>
      <div className="container mx-auto px-4 py-8 space-y-12">
        
        <section className="relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-sm p-12 text-white animate-fade-in">
          <div className="relative z-10 text-center space-y-6">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
              НОВОГОДНИЙ БЕСПРЕДЕЛ
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
                <div className="text-sm opacity-80 uppercase tracking-wide">Комплексов</div>
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
            <TabsTrigger value="schedule" className="text-base font-semibold">
              <Icon name="Calendar" size={20} className="mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="workouts" className="text-base font-semibold">
              <Icon name="Dumbbell" size={20} className="mr-2" />
              Комплексы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-6">
            <div className="flex flex-wrap gap-3 justify-center bg-black/40 backdrop-blur-sm rounded-xl p-4">
              <Button 
                variant={selectedCategory === 'Новички МЖ' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Новички МЖ')}
                className="font-semibold"
              >
                Новички МЖ
              </Button>
              <Button 
                variant={selectedCategory === 'Новички МЖ+' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Новички МЖ+')}
              >
                Новички МЖ+
              </Button>
              <Button 
                variant={selectedCategory === 'Команды Про' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Команды Про')}
              >
                Команды Про
              </Button>
            </div>

            <Card className="animate-fade-in bg-black/60 backdrop-blur-md border-white/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/40">
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



          <TabsContent value="schedule" className="space-y-4">
            <Card className="animate-fade-in bg-black/60 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-white">
                  <Icon name="CalendarDays" size={28} />
                  Программа соревнований
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockSchedule.map((event, index) => (
                  <div 
                    key={event.id}
                    className="rounded-xl border-2 border-white/20 overflow-hidden animate-slide-in bg-black/40"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <button
                      onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                      className="w-full flex items-center gap-6 p-5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex-1 flex items-center gap-6">
                        <div>
                          <h4 className="font-bold text-xl text-left text-white">{event.event}</h4>
                          <p className="text-sm text-white/60 text-left">
                            {event.heats.length} заходов
                          </p>
                        </div>
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
                        {event.status === 'live' ? 'Идёт' : event.status === 'completed' ? 'Завершено' : 'Скоро'}
                      </Badge>
                      <Icon 
                        name={expandedEvent === event.id ? "ChevronUp" : "ChevronDown"} 
                        size={24}
                        className="text-white/60"
                      />
                    </button>
                    
                    {expandedEvent === event.id && (
                      <div className="border-t border-white/20 bg-white/5 p-4 space-y-2">
                        {event.heats.map((heat, heatIndex) => (
                          <div 
                            key={heatIndex}
                            className="flex items-center justify-between p-3 bg-black/40 rounded-lg"
                          >
                            <div className="flex items-center gap-4">
                              <div className="text-2xl font-bold text-primary min-w-[60px]">
                                {heat.time}
                              </div>
                              <div className="h-10 w-px bg-white/20"></div>
                              <Badge variant="outline" className="font-semibold border-white/40 text-white">
                                {heat.category}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-4">
            <Card className="animate-fade-in bg-black/60 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-white">
                  <Icon name="Dumbbell" size={28} />
                  Описание комплексов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-4">
                  <div className="bg-black/40 rounded-xl p-6 border-2 border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">Новички МЖ / Новички МЖ+</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-primary mb-2">Комплекс 1</h4>
                        <p className="text-white/90 mb-2">3 круга:</p>
                        <ul className="list-disc list-inside text-white/80 space-y-1 ml-2">
                          <li>15 приседаний</li>
                          <li>10 отжиманий</li>
                          <li>5 подтягиваний</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-primary mb-2">Комплекс 2</h4>
                        <ul className="list-disc list-inside text-white/80 space-y-1 ml-2">
                          <li>100 синхронных выпадов</li>
                          <li>200 берпи на двоих</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-primary mb-2">Комплекс 3</h4>
                        <p className="text-white/90 mb-2">4 круга:</p>
                        <ul className="list-disc list-inside text-white/80 space-y-1 ml-2">
                          <li>20 калорий гребля</li>
                          <li>20 становых (100/80 кг)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-xl p-6 border-2 border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">Команды Про</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-primary mb-2">Комплекс 1</h4>
                        <ul className="list-disc list-inside text-white/80 space-y-1 ml-2">
                          <li>А1</li>
                          <li>А2 + А3: 10 кувырков и максимум баллов в дартс</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-primary mb-2">Комплекс 2</h4>
                        <p className="text-white/80">))))</p>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-primary mb-2">Комплекс 3</h4>
                        <p className="text-white/80">___</p>
                      </div>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}