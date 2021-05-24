-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 24, 2021 alle 21:57
-- Versione del server: 10.4.18-MariaDB
-- Versione PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `università`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `commento`
--

CREATE TABLE `commento` (
  `ID` int(11) NOT NULL,
  `Post_ID` int(11) DEFAULT NULL,
  `CF` char(16) DEFAULT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Cognome` varchar(255) DEFAULT NULL,
  `text` varchar(510) DEFAULT NULL,
  `datacommento` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `commento`
--

INSERT INTO `commento` (`ID`, `Post_ID`, `CF`, `Nome`, `Cognome`, `text`, `datacommento`) VALUES
(1, 1, 'ZCCLRT99M30A494R', 'Alberto', 'Ragaglia', 'Primo piano dell\'edificio Didattica alla cittadella', '2021-05-24 21:53:25'),
(2, 2, 'CCCRZC65C312CR12', 'Giovanni', 'Regalbuto', 'Le lezioni riprenderanno giorno 04-05', '2021-05-24 21:54:25'),
(3, 1, 'CCCBCD567YUIOL34', 'Carlo', 'Bonifacio', 'Esatto, vicino il polifunzionale', '2021-05-24 21:56:57');

-- --------------------------------------------------------

--
-- Struttura della tabella `corso_di_laurea`
--

CREATE TABLE `corso_di_laurea` (
  `Codice` int(11) NOT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Codice_DIP` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `corso_di_laurea`
--

INSERT INTO `corso_di_laurea` (`Codice`, `Nome`, `Codice_DIP`) VALUES
(1, 'Ingegneria Informatica', 0),
(2, 'Ingegneria Elettronica', 0),
(3, 'Ingegneria Elettrica', 0),
(15, 'Psicologia', 1),
(16, 'Scienze della formazione e dell\'educazione', 1),
(23, 'Economia aziendale', 2),
(34, 'Informatica', 2),
(45, 'Fisioterapia', 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `dipartimento`
--

CREATE TABLE `dipartimento` (
  `Codice` int(11) NOT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Descrizione` varchar(1024) DEFAULT NULL,
  `img_src` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `dipartimento`
--

INSERT INTO `dipartimento` (`Codice`, `Nome`, `Descrizione`, `img_src`) VALUES
(0, 'Dipartimento di Ingegneria', 'Il Dipartimento di Ingegneria Elettrica Elettronica e Informatica (DIEEI) è stato istituito nel 2010', '../Foto/Dip1.jpg'),
(1, 'Dipartimento Scienze della Formazione', 'La storia del Dipartimento di Scienze della Formazione (prima Facoltà di Scienze della formazione) dell\'Università di Catania ha inizio nel 1949', '../Foto/Dip3.jpg'),
(2, 'Dipartimento di Economia', 'Il Dipartimento di Economia raccoglie le competenze e le attività scientifico-didattiche, omogenee sotto il profilo culturale,', '../Foto/Dip2.jpg'),
(4, 'Dipartimento di Veterinaria', 'La missione del DSV è quella di favorire l’insegnamento avanzato, l’apprendimento e la ricerca nel', '../Foto/Dip4.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `docente`
--

CREATE TABLE `docente` (
  `CF` char(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Cognome` varchar(255) DEFAULT NULL,
  `Città` varchar(255) DEFAULT NULL,
  `Data` date DEFAULT NULL,
  `età` int(11) DEFAULT NULL,
  `Salario` float DEFAULT NULL,
  `n_materie` int(11) DEFAULT NULL,
  `Codice_CDL` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `docente`
--

INSERT INTO `docente` (`CF`, `email`, `password`, `Nome`, `Cognome`, `Città`, `Data`, `età`, `Salario`, `n_materie`, `Codice_CDL`) VALUES
('BBBCX343CCDC3415', 'picca@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Piccarda', 'Donati', 'Catania', '1960-07-01', 0, 3500, 1, 15),
('CCCRZC65C312CR12', 'giovi@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Giovanni', 'Regalbuto', 'Catania', '2967-08-03', 0, 2000, 1, 1),
('CCCZ34C567XC32X3', 'fede@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Federico', 'Cortuso', 'Catania', '1969-01-15', 0, 1300, 1, 16),
('DDDZ234X56CFSD56', 'franci@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Francesca', 'Lignano', 'Catania', '1974-02-03', 0, 2100, 1, 23),
('GGG214CF3CS2DF34', 'dante@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Dante', 'Cusmano', 'Catania', '1979-11-03', 0, 2500, 1, 34),
('MMMMRL87C312CR12', 'mari@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Maria Laura', 'Morabito', 'Catania', '1964-07-03', 0, 3000, 2, 1),
('RRRRSS54C312CA56', 'rachi@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Rachele', 'Roncato', 'Catania', '1980-06-03', 0, 1800, 1, 1),
('ZZZXF5ER5YSC789S', 'pier@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Pierluca', 'Di Mauro', 'Catania', '1967-12-03', 0, 3200, 1, 45);

-- --------------------------------------------------------

--
-- Struttura della tabella `esame`
--

CREATE TABLE `esame` (
  `ID_Esame` int(11) NOT NULL,
  `Studente` int(11) DEFAULT NULL,
  `Data_esame` date DEFAULT NULL,
  `Voto` int(11) DEFAULT NULL,
  `Lode` char(2) DEFAULT NULL,
  `Codice_Materia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `eventi`
--

CREATE TABLE `eventi` (
  `ID` int(11) NOT NULL,
  `Titolo` varchar(255) DEFAULT NULL,
  `Descrizione` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `eventi`
--

INSERT INTO `eventi` (`ID`, `Titolo`, `Descrizione`) VALUES
(1, 'Seminario Salesforce Technology: Introduzione alla tecnologia e opportunità lavorative in Skylabsx', 'L’opportunità incontra il talento. Lunedì 22 marzo, alle 9.00, ci sarà il webinar di presentazione dei nuovi corsi gratuiti'),
(2, 'Survey nazionale sull\'orientamento vocazionale', 'Si invitano gli studenti del I anno ed i neolaureati a compilare la Survey nazionale sull’orientamento vocazionale agli studi di Ingegneria');

-- --------------------------------------------------------

--
-- Struttura della tabella `insegnamenti`
--

CREATE TABLE `insegnamenti` (
  `Professore` char(16) NOT NULL,
  `Codice_Materia` int(11) NOT NULL,
  `Codice_CDL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `insegnamenti`
--

INSERT INTO `insegnamenti` (`Professore`, `Codice_Materia`, `Codice_CDL`) VALUES
('BBBCX343CCDC3415', 7, 15),
('CCCRZC65C312CR12', 4, 1),
('CCCZ34C567XC32X3', 8, 16),
('DDDZ234X56CFSD56', 5, 23),
('GGG214CF3CS2DF34', 9, 34),
('MMMMRL87C312CR12', 1, 1),
('MMMMRL87C312CR12', 2, 1),
('RRRRSS54C312CA56', 3, 1),
('ZZZXF5ER5YSC789S', 6, 45);

--
-- Trigger `insegnamenti`
--
DELIMITER $$
CREATE TRIGGER `n_materie` AFTER INSERT ON `insegnamenti` FOR EACH ROW begin
if exists (select * from docente where CF=new.Professore)
then update docente set n_materie=n_materie+1
where CF=new.Professore;
else signal sqlstate '45000'set message_text='Il negozio non esiste';
end if;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `iscritti`
--

CREATE TABLE `iscritti` (
  `CF` char(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `iscritti`
--

INSERT INTO `iscritti` (`CF`) VALUES
('PLVGLI99R70C351Y'),
('PLVPLA99R31C351U'),
('RMOFNC99S02C351P'),
('ZCCLRT99M30A494R');

-- --------------------------------------------------------

--
-- Struttura della tabella `materia`
--

CREATE TABLE `materia` (
  `Codice` int(11) NOT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Tutor` char(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `materia`
--

INSERT INTO `materia` (`Codice`, `Nome`, `Tutor`) VALUES
(1, 'Data Base', NULL),
(2, 'Web Programming', 'CCCBCD567YUIOL34'),
(3, 'Automatica', 'AAAERT517CDSR345'),
(4, 'Elettronica', 'GGGPNS459PSLDR45'),
(5, 'Storia Economica', 'GGGERT5678ERECS4'),
(6, 'Istologia', NULL),
(7, 'Pedagogia', NULL),
(8, 'Sociologia', NULL),
(9, 'Informatica musicale', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `mipiace`
--

CREATE TABLE `mipiace` (
  `Post_ID` int(11) NOT NULL,
  `CF` char(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `mipiace`
--

INSERT INTO `mipiace` (`Post_ID`, `CF`) VALUES
(1, 'CCCBCD567YUIOL34'),
(1, 'ZCCLRT99M30A494R'),
(2, 'CCCBCD567YUIOL34'),
(2, 'CCCRZC65C312CR12'),
(2, 'RMOFNC99S02C351P');

-- --------------------------------------------------------

--
-- Struttura della tabella `notizie`
--

CREATE TABLE `notizie` (
  `ID` int(11) NOT NULL,
  `titolo` varchar(255) DEFAULT NULL,
  `Descrizione` varchar(1024) DEFAULT NULL,
  `img_src` varchar(255) DEFAULT NULL,
  `data_notizia` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `notizie`
--

INSERT INTO `notizie` (`ID`, `titolo`, `Descrizione`, `img_src`, `data_notizia`) VALUES
(1, 'Ulteriori attività formative - corsi online su Coursera', 'Si ricorda agli studenti che l’Università di Catania ha aderito al programma Coursera for Campus Basic Student Plan al fine di', '../Foto/Coursera.jpeg', '2021-03-03'),
(2, 'Lezioni 2° semestre: come prenotare il posto in aula', 'Per le lezioni del secondo semestre che si tengono in modalità mista, si invitano gli studenti a consultare le modalità', '../Foto/Aule.JPG', '2021-04-05');

-- --------------------------------------------------------

--
-- Struttura della tabella `post`
--

CREATE TABLE `post` (
  `ID` int(11) NOT NULL,
  `Titolo` varchar(255) DEFAULT NULL,
  `text` varchar(510) DEFAULT NULL,
  `CF` char(16) DEFAULT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Cognome` varchar(255) DEFAULT NULL,
  `datapost` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `post`
--

INSERT INTO `post` (`ID`, `Titolo`, `text`, `CF`, `Nome`, `Cognome`, `datapost`) VALUES
(1, 'Richiesta aula', 'Salve a tutti, qualcuno saprebbe dirmi dove si trova la D14?', 'RMOFNC99S02C351P', 'Francesco', 'Romeo', '2021-05-24'),
(2, 'Pausa didattica', 'Ciao a tutti, qualcuno potrebbe dirmi quando ricominciano le lezioni?', 'ZCCLRT99M30A494R', 'Alberto', 'Ragaglia', '2021-05-24');

-- --------------------------------------------------------

--
-- Struttura della tabella `sede`
--

CREATE TABLE `sede` (
  `ID_Sede` int(11) NOT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Latitudine` float DEFAULT NULL,
  `Longitudine` float DEFAULT NULL,
  `Colore` varchar(255) DEFAULT NULL,
  `Codice_DIP` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `sede`
--

INSERT INTO `sede` (`ID_Sede`, `Nome`, `Latitudine`, `Longitudine`, `Colore`, `Codice_DIP`) VALUES
(1, 'Edificio 12', 37.5216, 15.1039, 'black', 0),
(2, 'Edificio 14', 37.541, 15.0688, 'purple', 1),
(3, 'Edificio 13', 37.505, 15.0691, 'hotpink', 2),
(4, 'Benedettini', 37.2864, 14.9988, 'red', 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `studente`
--

CREATE TABLE `studente` (
  `Matricola` int(11) NOT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Cognome` varchar(255) DEFAULT NULL,
  `CF` char(16) NOT NULL,
  `Data_di_nascita` date DEFAULT NULL,
  `Età` int(11) DEFAULT NULL,
  `Citta_di_nascita` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `Tipo` varchar(255) DEFAULT NULL,
  `Codice_CDL` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `studente`
--

INSERT INTO `studente` (`Matricola`, `Nome`, `Cognome`, `CF`, `Data_di_nascita`, `Età`, `Citta_di_nascita`, `Email`, `password`, `Tipo`, `Codice_CDL`) VALUES
(1, 'Francesco', 'Romeo', 'RMOFNC99S02C351P', '1999-11-02', 21, 'Catania', 'fraromeo69@gmail.com', '$2y$10$3yead49DcWTViX.EKT0xYep/eMcRD8v4I6RoZ37DddvqglgrHHo92', 'Regolare', 1),
(2, 'Alberto', 'Ragaglia', 'ZCCLRT99M30A494R', '1999-08-30', 21, 'Augusta', 'albertoraghi02@gmail.com', '$2y$10$0uIwB1LocD8HFoPg/fOvK.1MG5L5Td6u7ZEJIazGyu7o5YlVqlhWC', 'Regolare', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `tutor`
--

CREATE TABLE `tutor` (
  `CF` char(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `Nome` varchar(255) DEFAULT NULL,
  `Cognome` varchar(255) DEFAULT NULL,
  `Città` varchar(255) DEFAULT NULL,
  `Data` date DEFAULT NULL,
  `età` int(11) DEFAULT NULL,
  `Utilità` varchar(255) DEFAULT NULL,
  `Codice_CDL` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `tutor`
--

INSERT INTO `tutor` (`CF`, `email`, `password`, `Nome`, `Cognome`, `Città`, `Data`, `età`, `Utilità`, `Codice_CDL`) VALUES
('AAAERT517CDSR345', 'ale@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Alessia', 'Bonanno', 'Catania', '1995-07-03', 0, 'Pratico', 1),
('CCCBCD567YUIOL34', 'carletto@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Carlo', 'Bonifacio', 'Catania', '1989-07-04', 0, 'Laboratorio', 1),
('CCCCFG654DSERT65', 'cinzi@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Cinzia', 'Di Paola', 'Catania', '1990-05-03', 0, 'Pratico', 1),
('GGGERT5678ERECS4', 'peppe@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Giuseppe', 'Napoli', 'Catania', '1987-10-03', 0, 'Teorico', 1),
('GGGPNS459PSCDR45', 'nni@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Gio', 'Pen', 'Catania', '1985-07-30', 0, 'Pratico', 2),
('GGGPNS459PSLDR45', 'nanni@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Giovanni', 'Pennisi', 'Catania', '1985-07-30', 0, 'Pratico', 1),
('MMMARN456ESRCZI7', 'mario@gmail.com', '$2y$10$wRtXTUyzSghy1cgNhZ5T5.bXXGWqlLA/8vlmYEGZclIgFNdBdBrZG', 'Mario', 'Arena', 'Catania', '1986-12-03', 0, 'Pratico', 1);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `commento`
--
ALTER TABLE `commento`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Postx1` (`Post_ID`);

--
-- Indici per le tabelle `corso_di_laurea`
--
ALTER TABLE `corso_di_laurea`
  ADD PRIMARY KEY (`Codice`),
  ADD KEY `Dip1` (`Codice_DIP`);

--
-- Indici per le tabelle `dipartimento`
--
ALTER TABLE `dipartimento`
  ADD PRIMARY KEY (`Codice`);

--
-- Indici per le tabelle `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`CF`),
  ADD KEY `CDL7` (`Codice_CDL`);

--
-- Indici per le tabelle `esame`
--
ALTER TABLE `esame`
  ADD PRIMARY KEY (`ID_Esame`),
  ADD KEY `Matric1` (`Studente`),
  ADD KEY `Matx1` (`Codice_Materia`);

--
-- Indici per le tabelle `eventi`
--
ALTER TABLE `eventi`
  ADD PRIMARY KEY (`ID`);

--
-- Indici per le tabelle `insegnamenti`
--
ALTER TABLE `insegnamenti`
  ADD PRIMARY KEY (`Professore`,`Codice_Materia`,`Codice_CDL`),
  ADD KEY `CDL6` (`Codice_CDL`),
  ADD KEY `CF3` (`Professore`),
  ADD KEY `Matx` (`Codice_Materia`);

--
-- Indici per le tabelle `iscritti`
--
ALTER TABLE `iscritti`
  ADD PRIMARY KEY (`CF`);

--
-- Indici per le tabelle `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`Codice`),
  ADD KEY `Tutx` (`Tutor`);

--
-- Indici per le tabelle `mipiace`
--
ALTER TABLE `mipiace`
  ADD PRIMARY KEY (`Post_ID`,`CF`),
  ADD KEY `Postx2` (`Post_ID`);

--
-- Indici per le tabelle `notizie`
--
ALTER TABLE `notizie`
  ADD PRIMARY KEY (`ID`);

--
-- Indici per le tabelle `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`ID`);

--
-- Indici per le tabelle `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`ID_Sede`),
  ADD KEY `DIPX4` (`Codice_DIP`);

--
-- Indici per le tabelle `studente`
--
ALTER TABLE `studente`
  ADD PRIMARY KEY (`Matricola`,`CF`),
  ADD KEY `CDL5` (`Codice_CDL`);

--
-- Indici per le tabelle `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`CF`),
  ADD KEY `CDL6` (`Codice_CDL`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `commento`
--
ALTER TABLE `commento`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `esame`
--
ALTER TABLE `esame`
  MODIFY `ID_Esame` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `eventi`
--
ALTER TABLE `eventi`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `notizie`
--
ALTER TABLE `notizie`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `post`
--
ALTER TABLE `post`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `studente`
--
ALTER TABLE `studente`
  MODIFY `Matricola` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `commento`
--
ALTER TABLE `commento`
  ADD CONSTRAINT `commento_ibfk_1` FOREIGN KEY (`Post_ID`) REFERENCES `post` (`ID`);

--
-- Limiti per la tabella `corso_di_laurea`
--
ALTER TABLE `corso_di_laurea`
  ADD CONSTRAINT `corso_di_laurea_ibfk_1` FOREIGN KEY (`Codice_DIP`) REFERENCES `dipartimento` (`Codice`);

--
-- Limiti per la tabella `docente`
--
ALTER TABLE `docente`
  ADD CONSTRAINT `docente_ibfk_1` FOREIGN KEY (`Codice_CDL`) REFERENCES `corso_di_laurea` (`Codice`);

--
-- Limiti per la tabella `esame`
--
ALTER TABLE `esame`
  ADD CONSTRAINT `esame_ibfk_1` FOREIGN KEY (`Studente`) REFERENCES `studente` (`Matricola`),
  ADD CONSTRAINT `esame_ibfk_2` FOREIGN KEY (`Codice_Materia`) REFERENCES `materia` (`Codice`);

--
-- Limiti per la tabella `insegnamenti`
--
ALTER TABLE `insegnamenti`
  ADD CONSTRAINT `insegnamenti_ibfk_1` FOREIGN KEY (`Codice_CDL`) REFERENCES `corso_di_laurea` (`Codice`),
  ADD CONSTRAINT `insegnamenti_ibfk_2` FOREIGN KEY (`Professore`) REFERENCES `docente` (`CF`),
  ADD CONSTRAINT `insegnamenti_ibfk_3` FOREIGN KEY (`Codice_Materia`) REFERENCES `materia` (`Codice`);

--
-- Limiti per la tabella `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`Tutor`) REFERENCES `tutor` (`CF`);

--
-- Limiti per la tabella `mipiace`
--
ALTER TABLE `mipiace`
  ADD CONSTRAINT `mipiace_ibfk_1` FOREIGN KEY (`Post_ID`) REFERENCES `post` (`ID`);

--
-- Limiti per la tabella `sede`
--
ALTER TABLE `sede`
  ADD CONSTRAINT `sede_ibfk_1` FOREIGN KEY (`Codice_DIP`) REFERENCES `dipartimento` (`Codice`);

--
-- Limiti per la tabella `studente`
--
ALTER TABLE `studente`
  ADD CONSTRAINT `studente_ibfk_1` FOREIGN KEY (`Codice_CDL`) REFERENCES `corso_di_laurea` (`Codice`);

--
-- Limiti per la tabella `tutor`
--
ALTER TABLE `tutor`
  ADD CONSTRAINT `tutor_ibfk_1` FOREIGN KEY (`Codice_CDL`) REFERENCES `corso_di_laurea` (`Codice`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
