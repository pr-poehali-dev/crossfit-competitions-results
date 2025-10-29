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
  team: string;
  score: number;
  avatar: string;
}

interface ScheduleEvent {
  id: number;
  time: string;
  event: string;
  location: string;
  status: 'upcoming' | 'live' | 'completed';
}

const mockParticipants: Participant[] = [
  { id: 1, name: 'Алексей Волков', category: 'RX Male', team: 'Титаны', score: 485, avatar: '💪' },
  { id: 2, name: 'Мария Соколова', category: 'RX Female', team: 'Валькирии', score: 478, avatar: '🔥' },
  { id: 3, name: 'Дмитрий Новиков', category: 'RX Male', team: 'Спартанцы', score: 472, avatar: '⚡' },
  { id: 4, name: 'Елена Петрова', category: 'RX Female', team: 'Амазонки', score: 465, avatar: '💎' },
  { id: 5, name: 'Иван Смирнов', category: 'Scaled Male', team: 'Легион', score: 458, avatar: '🦁' },
  { id: 6, name: 'Ольга Кузнецова', category: 'Scaled Female', team: 'Феникс', score: 451, avatar: '🌟' },
];

const mockSchedule: ScheduleEvent[] = [
  { id: 1, time: '09:00', event: 'WOD 1: Fran', location: 'Площадка A', status: 'completed' },
  { id: 2, time: '11:00', event: 'WOD 2: Cindy', location: 'Площадка B', status: 'live' },
  { id: 3, time: '14:00', event: 'WOD 3: Diane', location: 'Площадка A', status: 'upcoming' },
  { id: 4, time: '16:00', event: 'WOD 4: Helen', location: 'Площадка C', status: 'upcoming' },
  { id: 5, time: '18:00', event: 'Финал', location: 'Главная арена', status: 'upcoming' },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredParticipants = selectedCategory === 'all' 
    ? mockParticipants 
    : mockParticipants.filter(p => p.category === selectedCategory);

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
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="font-semibold"
              >
                Все категории
              </Button>
              <Button 
                variant={selectedCategory === 'RX Male' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('RX Male')}
              >
                RX Male
              </Button>
              <Button 
                variant={selectedCategory === 'RX Female' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('RX Female')}
              >
                RX Female
              </Button>
              <Button 
                variant={selectedCategory === 'Scaled Male' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Scaled Male')}
              >
                Scaled Male
              </Button>
              <Button 
                variant={selectedCategory === 'Scaled Female' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Scaled Female')}
              >
                Scaled Female
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredParticipants.map((participant, index) => (
                <Card 
                  key={participant.id} 
                  className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{participant.avatar}</div>
                        <div>
                          <h3 className="font-bold text-lg">{participant.name}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {participant.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-extrabold text-primary">
                          #{index + 1}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Icon name="Users" size={16} />
                          Команда
                        </span>
                        <span className="font-semibold">{participant.team}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Icon name="Award" size={16} />
                          Очки
                        </span>
                        <span className="font-bold text-xl text-secondary">{participant.score}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
