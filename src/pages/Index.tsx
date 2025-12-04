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
  wod2: { result: string; points: number };
  wod3?: { result: string; points: number };
  wod3_1?: { result: string; points: number };
  wod3_2?: { result: string; points: number };
  wod4_1?: { result: string; points: number };
  wod4_2?: { result: string; points: number };
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
  // Команды Про
  { id: 1, name: 'Команда 1', category: 'Команды Про', avatar: '🏆', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3_1: { result: '-', points: 0 }, wod3_2: { result: '-', points: 0 }, wod4_1: { result: '-', points: 0 }, wod4_2: { result: '-', points: 0 }, final: { place: 1, points: 0 }, totalScore: 0 },
  { id: 2, name: 'Команда 2', category: 'Команды Про', avatar: '⚡', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3_1: { result: '-', points: 0 }, wod3_2: { result: '-', points: 0 }, wod4_1: { result: '-', points: 0 }, wod4_2: { result: '-', points: 0 }, final: { place: 2, points: 0 }, totalScore: 0 },
  
  // Новички МЖ
  { id: 3, name: 'ПроМёд', category: 'Новички МЖ', avatar: '🍯', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 1, points: 0 }, totalScore: 0 },
  { id: 4, name: 'Force of two', category: 'Новички МЖ', avatar: '⚡', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 2, points: 0 }, totalScore: 0 },
  { id: 5, name: 'Ёлочный ЕМОМ', category: 'Новички МЖ', avatar: '🎄', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 3, points: 0 }, totalScore: 0 },
  { id: 6, name: 'Белые и красивые', category: 'Новички МЖ', avatar: '❄️', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 4, points: 0 }, totalScore: 0 },
  { id: 7, name: 'Любят адреналин, но возможно напиток', category: 'Новички МЖ', avatar: '🥤', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 5, points: 0 }, totalScore: 0 },
  { id: 8, name: 'Стар и млад', category: 'Новички МЖ', avatar: '👴', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 6, points: 0 }, totalScore: 0 },
  { id: 9, name: 'Белоснежка +1', category: 'Новички МЖ', avatar: '👸', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 7, points: 0 }, totalScore: 0 },
  { id: 10, name: 'Маша и медведь', category: 'Новички МЖ', avatar: '🐻', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 8, points: 0 }, totalScore: 0 },
  { id: 11, name: 'Кошки-мышки', category: 'Новички МЖ', avatar: '🐱', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 9, points: 0 }, totalScore: 0 },
  { id: 12, name: 'Битой по зубам', category: 'Новички МЖ', avatar: '🏏', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 10, points: 0 }, totalScore: 0 },
  { id: 13, name: 'Суперы (ударение на У)', category: 'Новички МЖ', avatar: '🦸', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 11, points: 0 }, totalScore: 0 },
  { id: 14, name: 'ХМЕЛИСУМЕЛИ', category: 'Новички МЖ', avatar: '🍺', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 12, points: 0 }, totalScore: 0 },
  
  // Новички МЖ+
  { id: 15, name: 'Семейные', category: 'Новички МЖ+', avatar: '👨‍👩‍👧', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 1, points: 0 }, totalScore: 0 },
  { id: 16, name: 'Лило и Стич', category: 'Новички МЖ+', avatar: '🌺', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 2, points: 0 }, totalScore: 0 },
  { id: 17, name: 'Steel&fire', category: 'Новички МЖ+', avatar: '🔥', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 3, points: 0 }, totalScore: 0 },
  { id: 18, name: 'Одуванчики', category: 'Новички МЖ+', avatar: '🌼', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 4, points: 0 }, totalScore: 0 },
  { id: 19, name: 'Елки ИГО голки', category: 'Новички МЖ+', avatar: '🎄', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 5, points: 0 }, totalScore: 0 },
  { id: 20, name: 'Елочные гладиаторы', category: 'Новички МЖ+', avatar: '⚔️', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 6, points: 0 }, totalScore: 0 },
  { id: 21, name: 'НЕЛИШНИЕ КИЛОГРАММЫ', category: 'Новички МЖ+', avatar: '⚖️', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 7, points: 0 }, totalScore: 0 },
  { id: 22, name: 'Все еще новички', category: 'Новички МЖ+', avatar: '🆕', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 8, points: 0 }, totalScore: 0 },
  { id: 23, name: 'НикОля', category: 'Новички МЖ+', avatar: '🎅', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 9, points: 0 }, totalScore: 0 },
  { id: 24, name: 'Hoops&Wilde', category: 'Новички МЖ+', avatar: '🏀', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 10, points: 0 }, totalScore: 0 },
  { id: 25, name: 'Можем хуже', category: 'Новички МЖ+', avatar: '🤷', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 11, points: 0 }, totalScore: 0 },
  { id: 26, name: 'Однофамильцы', category: 'Новички МЖ+', avatar: '👥', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 12, points: 0 }, totalScore: 0 },
  { id: 27, name: 'Ватутины', category: 'Новички МЖ+', avatar: '🎯', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 13, points: 0 }, totalScore: 0 },
  { id: 28, name: 'Внуки Деда Мороза', category: 'Новички МЖ+', avatar: '🎅', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 14, points: 0 }, totalScore: 0 },
  { id: 29, name: 'Мутный Енот', category: 'Новички МЖ+', avatar: '🦝', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 15, points: 0 }, totalScore: 0 },
  { id: 30, name: 'Ух ты пухты', category: 'Новички МЖ+', avatar: '🎉', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 16, points: 0 }, totalScore: 0 },
  { id: 31, name: 'Устимов', category: 'Новички МЖ+', avatar: '🌟', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 17, points: 0 }, totalScore: 0 },
  { id: 32, name: 'Пухлые утки', category: 'Новички МЖ+', avatar: '🦆', wod1_1: { result: '-', points: 0 }, wod1_2: { result: '-', points: 0 }, wod2: { result: '-', points: 0 }, wod3: { result: '-', points: 0 }, final: { place: 18, points: 0 }, totalScore: 0 },
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
  const [expandedWorkout, setExpandedWorkout] = useState<number | null>(null);

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
                        <th className="px-4 py-3 text-center text-xs font-bold uppercase">2</th>
                        {selectedCategory === 'Команды Про' ? (
                          <>
                            <th className="px-4 py-3 text-center text-xs font-bold uppercase">3.1</th>
                            <th className="px-4 py-3 text-center text-xs font-bold uppercase">3.2</th>
                            <th className="px-4 py-3 text-center text-xs font-bold uppercase">4.1</th>
                            <th className="px-4 py-3 text-center text-xs font-bold uppercase">4.2</th>
                          </>
                        ) : (
                          <th className="px-4 py-3 text-center text-xs font-bold uppercase">3</th>
                        )}
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
                                index === 0 ? 'text-2xl font-extrabold text-yellow-400' :
                                index === 1 ? 'text-xl font-bold text-gray-300' :
                                index === 2 ? 'text-lg font-bold text-orange-400' :
                                'text-lg font-semibold text-white'
                              }>
                                #{index + 1}
                              </div>
                              {index < 3 && (
                                <Icon 
                                  name={index === 0 ? 'Trophy' : index === 1 ? 'Medal' : 'Award'} 
                                  size={20}
                                  className={index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : 'text-orange-400'}
                                />
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="text-2xl">{participant.avatar}</div>
                              <div className="font-bold text-base text-white">{participant.name}</div>
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
                            <div className="font-semibold">{participant.wod2.result}</div>
                            <div className="text-xs text-muted-foreground">({participant.wod2.points})</div>
                          </td>
                          {participant.category === 'Команды Про' ? (
                            <>
                              <td className="px-4 py-3 text-center">
                                <div className="font-semibold">{participant.wod3_1?.result}</div>
                                <div className="text-xs text-muted-foreground">({participant.wod3_1?.points})</div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="font-semibold">{participant.wod3_2?.result}</div>
                                <div className="text-xs text-muted-foreground">({participant.wod3_2?.points})</div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="font-semibold">{participant.wod4_1?.result}</div>
                                <div className="text-xs text-muted-foreground">({participant.wod4_1?.points})</div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="font-semibold">{participant.wod4_2?.result}</div>
                                <div className="text-xs text-muted-foreground">({participant.wod4_2?.points})</div>
                              </td>
                            </>
                          ) : (
                            <td className="px-4 py-3 text-center">
                              <div className="font-semibold">{participant.wod3?.result}</div>
                              <div className="text-xs text-muted-foreground">({participant.wod3?.points})</div>
                            </td>
                          )}
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
                  Расписание заходов
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
                
                {/* НОВИЧКИ МЖ */}
                <div className="bg-black/40 rounded-xl p-6 border-2 border-yellow-400/40">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
                    <Icon name="Flame" size={28} />
                    НОВИЧКИ МЖ
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 1 ? null : 1)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏋️</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 1</h4>
                            <p className="text-sm text-white/60">Запрягаем греблю!</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 1 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 1 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">ЕМОМ 10 минут (смена атлетов происходит каждую минуту)</p>
                          <div className="space-y-2 text-white/80">
                            <p className="font-medium">1-ая минута: А1 - набирает калории на гребле || А2 - в начале делает 3 берпи.</p>
                            <p>Дальше до конца минуты набирает повторения связки: 12 становых с гирей + 9 фронтальных приседаний с гирей + 6 маха гири (М 12/Ж 8 кг)</p>
                            <p className="font-medium">2-ая минута: А2 - набирает калории на гребле || А1 - в начале делает 3 берпи.</p>
                            <p>Дальше до конца минуты набирает повторения связки: 12 становых с гирей + 9 фронтальных приседаний с гирей + 6 маха гири (М 12/Ж 8 кг)</p>
                            <p className="text-yellow-400 font-semibold mt-3">2 зачета: калорий + повторения</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 2 ? null : 2)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">💪</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 2</h4>
                            <p className="text-sm text-white/60">Операция «Двойной Удар»</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 2 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 2 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">8 минут (все делится на двоих) - набрать как можно больше повторений.</p>
                          <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                            <li>16 перешагиваний бокса с 1-ой гантелью (15/7) (М 60/Ж 50)</li>
                            <li>16 швунгов гантели</li>
                            <li>4 тележки</li>
                          </ul>
                          <p className="text-white/90 font-semibold mt-3 mb-2">Отдых 1 минута</p>
                          <p className="text-white/90 font-semibold mb-2">4 минуты (все выполняется синхронно) - набрать как можно больше повторений</p>
                          <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                            <li>12 перепрыгиваний гантели</li>
                            <li>8 ситапов с медболом (каждый делает 8, вес медбола 4 кг)</li>
                            <li>4 рывок + трастер</li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 3 ? null : 3)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🔥</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 3</h4>
                            <p className="text-sm text-white/60">Подарок Империи</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 3 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 3 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">Крышка 9 минут</p>
                          <p className="text-yellow-400 font-bold mb-2">⚡100 ОП</p>
                          <div className="space-y-2 text-white/80">
                            <p className="font-semibold">🔵 3 круга</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>12 бросков мяча (один бросает, второй в синхрон приседает рядом) (6/4 кг)</li>
                              <li>6 перелезаний друг за другом (стена 100 см) на двоих</li>
                            </ul>
                            <p className="font-semibold mt-2">🔵 2 круга</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>15 бросков мяча (один бросает, второй в синхрон приседает рядом) (6/4 кг)</li>
                              <li>8 перелезаний на двоих</li>
                            </ul>
                            <p className="font-semibold mt-2">🔵 1 круг</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>18 бросков (один бросает, второй в синхрон приседает рядом) (6/4 кг)</li>
                              <li>10 перелезаний на двоих</li>
                            </ul>
                            <p className="text-yellow-400 font-bold mt-2">⚡100 ОП конец</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* НОВИЧКИ МЖ+ */}
                <div className="bg-black/40 rounded-xl p-6 border-2 border-blue-400/40">
                  <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                    <Icon name="Zap" size={28} />
                    НОВИЧКИ МЖ+
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 4 ? null : 4)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏋️</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 1</h4>
                            <p className="text-sm text-white/60">Запрягаем греблю!</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 4 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 4 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">ЕМОМ 10 минут (смена атлетов происходит каждую минуту)</p>
                          <div className="space-y-2 text-white/80">
                            <p className="font-medium">1-ая минута: А1 - набирает калории на гребле || А2 - в начале делает 5 берпи.</p>
                            <p>Дальше до конца минуты набирает повторения связки: 9 становых + 6 взятий с виса штанги + 3 фронт.приседа (М 40/Ж 25 кг)</p>
                            <p className="font-medium">2-ая минута: А2 - набирает калории на гребле || А1 - в начале делает 3 берпи.</p>
                            <p>Дальше до конца минуты набирает повторения связки: 9 становых + 6 взятий с виса штанги + 3 фронт.приседа (М 40/Ж 25 кг)</p>
                            <p className="text-blue-400 font-semibold mt-3">2 зачета: калорий + повторения</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 5 ? null : 5)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">💪</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 2</h4>
                            <p className="text-sm text-white/60">Операция «Двойной Удар»</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 5 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 5 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">8 минут (все делится на двоих) - набрать как можно больше повторений.</p>
                          <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                            <li>16 перешагиваний бокса с 1-ой гантелью (15/10) (М 60/Ж 50)</li>
                            <li>16 швунгов гантели</li>
                            <li>4 тележки</li>
                          </ul>
                          <p className="text-white/90 font-semibold mt-3 mb-2">Отдых 1 минута</p>
                          <p className="text-white/90 font-semibold mb-2">4 минуты (все выполняется синхронно) - набрать как можно больше повторений</p>
                          <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                            <li>12 перепрыгиваний гантели</li>
                            <li>8 ситапов с медболом (каждый делает 8, вес медбола 6 кг)</li>
                            <li>4 рывок + трастер</li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-lg border border-white/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedWorkout(expandedWorkout === 6 ? null : 6)}
                        className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🔥</span>
                          <div className="text-left">
                            <h4 className="text-xl font-bold text-primary">Комплекс 3</h4>
                            <p className="text-sm text-white/60">Подарок Империи</p>
                          </div>
                        </div>
                        <Icon 
                          name={expandedWorkout === 6 ? "ChevronUp" : "ChevronDown"} 
                          size={24}
                          className="text-white/60"
                        />
                      </button>
                      
                      {expandedWorkout === 6 && (
                        <div className="p-5 border-t border-white/20 bg-black/20">
                          <p className="text-white/90 font-semibold mb-2">Крышка 9 минут</p>
                          <p className="text-blue-400 font-bold mb-2">⚡100 ОП</p>
                          <div className="space-y-2 text-white/80">
                            <p className="font-semibold">🔵 3 круга</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>12 бросков мяча (один бросает, второй в синхрон приседает рядом) (9/6 кг)</li>
                              <li>6 перелезаний друг за другом (стена 100 см) на двоих</li>
                            </ul>
                            <p className="font-semibold mt-2">🔵 2 круга</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>15 бросков мяча (один бросает, второй в синхрон приседает рядом) (9/6 кг)</li>
                              <li>8 перелезаний на двоих</li>
                            </ul>
                            <p className="font-semibold mt-2">🔵 1 круг</p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                              <li>18 бросков (один бросает, второй в синхрон приседает рядом) (9/6 кг)</li>
                              <li>10 перелезаний на двоих</li>
                            </ul>
                            <p className="text-blue-400 font-bold mt-2">⚡100 ОП конец</p>
                          </div>
                        </div>
                      )}
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