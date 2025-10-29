-- Создаём таблицу участников
CREATE TABLE IF NOT EXISTS participants (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    avatar VARCHAR(10) DEFAULT '💪',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаём таблицу результатов
CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    participant_id INTEGER NOT NULL REFERENCES participants(id),
    wod_name VARCHAR(50) NOT NULL,
    result VARCHAR(50) NOT NULL,
    points INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(participant_id, wod_name)
);

-- Создаём индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_participants_category ON participants(category);
CREATE INDEX IF NOT EXISTS idx_results_participant ON results(participant_id);
CREATE INDEX IF NOT EXISTS idx_results_wod ON results(wod_name);

-- Добавляем тестовые данные
INSERT INTO participants (first_name, last_name, category, avatar) VALUES
('Алексей', 'Иванов', 'Мальчики 5-6', '💪'),
('София', 'Петрова', 'Девочки 5-6', '🔥'),
('Дмитрий', 'Смирнов', 'Мальчики 7-8', '⚡'),
('Анна', 'Волкова', 'Девочки 7-8', '💎'),
('Максим', 'Попов', 'Мальчики 9-10', '🦁'),
('Мария', 'Соколова', 'Девочки 9-10', '🌟');

-- Добавляем результаты для первого участника
INSERT INTO results (participant_id, wod_name, result, points) VALUES
(1, 'wod1_1', '45', 95),
(1, 'wod1_2', '2:15', 88),
(1, 'wod2_1', '1:45', 92),
(1, 'wod2_2', '3:20', 85),
(1, 'wod3', '5:10', 90),
(1, 'final', '1', 100);

-- Добавляем результаты для второго участника
INSERT INTO results (participant_id, wod_name, result, points) VALUES
(2, 'wod1_1', '42', 92),
(2, 'wod1_2', '2:20', 85),
(2, 'wod2_1', '1:50', 88),
(2, 'wod2_2', '3:25', 82),
(2, 'wod3', '5:15', 87),
(2, 'final', '1', 100);