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
  { id: 1, name: 'Арматурные Феи', category: 'Новички МЖ', avatar: '🔥', wod1_1: { result: '8:44:00', points: 100 }, wod1_2: { result: '6:18:00', points: 90 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 1, points: 0 }, totalScore: 190 },
  { id: 2, name: 'BARсучки', category: 'Новички МЖ', avatar: '🍻', wod1_1: { result: '8:54:00', points: 95 }, wod1_2: { result: '7:24:00', points: 75 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 2, points: 0 }, totalScore: 170 },
  { id: 3, name: 'Любим печеньки', category: 'Новички МЖ', avatar: '🍪', wod1_1: { result: '9:22:00', points: 85 }, wod1_2: { result: '7:01:00', points: 85 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 3, points: 0 }, totalScore: 170 },
  { id: 4, name: 'Girl Power', category: 'Новички МЖ', avatar: '💪', wod1_1: { result: '9:19:00', points: 90 }, wod1_2: { result: '7:31:00', points: 70 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 4, points: 0 }, totalScore: 160 },
  { id: 5, name: 'Тирамисучки', category: 'Новички МЖ', avatar: '🍰', wod1_1: { result: '10:01:00', points: 55 }, wod1_2: { result: '5:39:00', points: 100 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 5, points: 0 }, totalScore: 155 },
  { id: 6, name: 'SKAzka', category: 'Новички МЖ', avatar: '⭐', wod1_1: { result: '9:59:00', points: 60 }, wod1_2: { result: '6:07:00', points: 95 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 6, points: 0 }, totalScore: 155 },
  { id: 7, name: 'Двое из ларца', category: 'Новички МЖ', avatar: '🎭', wod1_1: { result: '9:38:00', points: 80 }, wod1_2: { result: '8:02:00', points: 65 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 7, points: 0 }, totalScore: 145 },
  { id: 8, name: 'БандаДам', category: 'Новички МЖ', avatar: '👑', wod1_1: { result: '9:42:00', points: 65 }, wod1_2: { result: '7:21:00', points: 80 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 8, points: 0 }, totalScore: 145 },
  { id: 9, name: 'The best', category: 'Новички МЖ', avatar: '🏆', wod1_1: { result: '9:38:00', points: 80 }, wod1_2: { result: '8:44:00', points: 50 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 9, points: 0 }, totalScore: 130 },
  { id: 10, name: 'ХВАТТЯГИ', category: 'Новички МЖ', avatar: '💥', wod1_1: { result: '9:41:00', points: 70 }, wod1_2: { result: '8:03:00', points: 60 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 10, points: 0 }, totalScore: 130 },
  { id: 11, name: 'Условно в форме', category: 'Новички МЖ', avatar: '🤸', wod1_1: { result: '10:20:00', points: 40 }, wod1_2: { result: '8:22:00', points: 55 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 11, points: 0 }, totalScore: 95 },
  { id: 12, name: 'Одуванчики', category: 'Новички МЖ', avatar: '🌼', wod1_1: { result: '10:03:00', points: 50 }, wod1_2: { result: '9:03:00', points: 45 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 12, points: 0 }, totalScore: 95 },
  { id: 13, name: 'Вишенки', category: 'Новички МЖ', avatar: '🍒', wod1_1: { result: '10:13:00', points: 45 }, wod1_2: { result: '9:12:00', points: 40 }, wod2_1: { result: '-', points: 0 }, wod2_2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 13, points: 0 }, totalScore: 85 },
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
        
        <section className="relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-sm p-6 md:p-12 text-white animate-fade-in">
          <div className="relative z-10 text-center space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
              НОВОГОДНИЙ БЕСПРЕДЕЛ
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-medium opacity-90 max-w-2xl mx-auto px-4">
              Следи за результатами в реальном времени
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold">{mockParticipants.length}</div>
                <div className="text-xs sm:text-sm opacity-80 uppercase tracking-wide">Участников</div>
              </div>
              <div className="h-12 sm:h-16 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold">{mockSchedule.length}</div>
                <div className="text-xs sm:text-sm opacity-80 uppercase tracking-wide">Комплексов</div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/10"></div>
        </section>

        <Tabs defaultValue="results" className="space-y-8 animate-fade-in">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-14">
            <TabsTrigger value="results" className="text-sm sm:text-base font-semibold">
              <Icon name="BarChart3" size={18} className="mr-1 sm:mr-2" />
              Результаты
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-sm sm:text-base font-semibold">
              <Icon name="Calendar" size={18} className="mr-1 sm:mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="workouts" className="text-sm sm:text-base font-semibold">
              <Icon name="Dumbbell" size={18} className="mr-1 sm:mr-2" />
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