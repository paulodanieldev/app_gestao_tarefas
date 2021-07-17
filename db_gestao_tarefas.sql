-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17-Jul-2021 às 05:00
-- Versão do servidor: 10.4.17-MariaDB
-- versão do PHP: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_gestao_tarefas`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_tarefa`
--

CREATE TABLE `tb_tarefa` (
  `id` int(11) NOT NULL,
  `descricao` text DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `data_cadastro` datetime DEFAULT NULL,
  `data_atualizacao` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_tarefa`
--

INSERT INTO `tb_tarefa` (`id`, `descricao`, `status`, `id_usuario`, `data_cadastro`, `data_atualizacao`) VALUES
(1, 'descrição de teste', 2, 4, '2020-11-05 17:21:55', '2021-07-17 02:50:42'),
(2, 'descrição de teste 2', 1, 4, '2020-11-05 17:21:55', NULL),
(5, 'descrição de teste 3', 1, 4, '2020-11-05 17:21:55', NULL),
(6, 'descrição de teste 3', 4, 4, '2020-11-05 17:21:55', '2021-07-17 02:49:36'),
(7, 'tarefa teste', 3, 1, NULL, '2021-07-17 02:42:18'),
(8, 'teste 2', 1, 1, NULL, '2021-07-17 02:22:29');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `data_cadastro` date DEFAULT NULL,
  `data_atualizacao` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_usuario`
--

INSERT INTO `tb_usuario` (`id`, `nome`, `data_cadastro`, `data_atualizacao`) VALUES
(4, 'Cleber Loriato', '2020-11-05', '2021-07-17'),
(11, 'Rafael Ferreira', '2021-07-17', '2021-07-17'),
(12, 'Paulo Daniel', '2021-07-17', '2021-07-17');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_tarefa`
--
ALTER TABLE `tb_tarefa`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_tarefa`
--
ALTER TABLE `tb_tarefa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
