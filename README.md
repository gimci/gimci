# ![gimci](https://avatars2.githubusercontent.com/u/22726552?v=3&s=200) Gimci
[![npm gimci](https://badge.fury.io/js/gimci.svg)](https://badge.fury.io/js/gimci) [![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)]()

## JS Natural Language Processing Module for Korean (한글 자연어처리 모듈)
Processing text in Korean with the character-based metric costs not only the great amount of calculation but it also reaps the quality of search off. Here you have a letter-based processing mechanism with the newly devised romanization rule (hangul-roman). Gimci is designed to boost the overall performance of Natural Language Processing models of Korean, and improve understanding of the Korean writing system in a remarkably different way.

## Motivation
Hangul characters are each composed of two to three letters (constructing block, 낱자): Initial (초성), Medial (중성), Final (종성). Traditional langauge processing models of Hangul handled the text with the unit of character meaning it considered the total possibilities of11172. (Initial 19 * Medial 21 * Final 28) when dealing with the next character to come. This is a tremendous amount if you scale up the volume to be processed.

Now if we can, at all, treat it by the unit of 'letter', the problem may shrink excessively. (Rough calculation dictates that we have 40 (Standard 24 + Combined 16) possibilities to look ahead)

Quite a jump in the overall performance! But how could we possibly achieve this? An idea of constructing a wholly new set of Romanization began here. it later turned out that the new rule also shed a light to a relationship between each letter of Hangul.

## Get Started
Gimci is implemented in JavaScript, with the view of making i runnable at both web web browsers and native operating systems. Start by installing via npm (node.js)


```
npm install --save gimci
```

## Live Demo
[Live Demo link](https://www.youtube.com/watch?v=ccoCD131Fb8)
