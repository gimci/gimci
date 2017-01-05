#  Gimci  ㄱㅣㅁㅊㅣ
*JS Natural Language Processing Module for Korean (한글 자연어처리 모듈)*
==[Gimci](https://gimci.github.io/)== is Processing Korean with the character-based metric costs not only the amount of calculation but it also reaps the accuracy off. Meet the letter-based processing with the newly devised Korean-Roman rule. Gimci is designed to boost the overall performance of Natural Language Processing models of Korean, and improve understanding of the Korean writing system in a remarkably different way.

목차

[TOC]

## Motivation
>낱자 단위 처리 및 로마자 전사법 개정을 통한 한글 자연어 처리 개선 연구는 2016 년 현재 사용되고 있는 한글 자연어 처리 방식과 그 알고리즘을 개선하기 위해 기획되었다. 자연어처리 (Natural Language Processing, NLP) 는 정보통신기기가 널리 보급되고 Data 가 기하급수적으로 생성되길 거듭하는 지금, 컴퓨터과학의 가장 주목 받는 영역 중 하나이다. 한글로 된 Data 의 처리 성능을 개선하는 것은 이러한 대량의 Data 를 체계화하고 가공하는 것에 도움이 되는 것은 물론, 인간과 기계의 소통을 돕는 등 다양한 분야에서 효용을 만들 수 있다. 현재 사용되는 기술 혹은 지금의 패러다임에서 인지한 주요한 네 가지 문제는 다음과 같다

`첫째` 현재 학계 및 업계에 알려진 Natural Language Processing 알고리즘들을 한글 Data 에 원활히 적용하지 못하고 있다.
`둘째` “낱자” (Letter) 라는 단위의 성분이 존재하는데 현재의 대부분은 “글자” 를 단위로 Data 를 처리한다. 즉, 처리 단위가 최소(Minimal) 이지 않다.
`셋째` 작금의 한글 – 로마자 전사법이 기계의 언어처리는 물론 사용자 (자연어 화자) 들의 언어 인식에도 혼란을 주고 있다.
`넷째`한글이라는 글자체계의 특성을 반영하지 않고 있다.


**위와 같은 이슈들의 합리적인 해결방안을 모색하고, 실제 개선안을 반영한 모델을 구현함으로써, 알고리즘의 성능을 향상시키고, 궁극적으로 다음 세대의 한글 자연어처리 패러다임을 제시할 수 있다**

## Installation
npm으로 간편하게 설치 할 수  있다..
```
npm install --save gimci
```

#APIs
## convertHangyrToRoman
한글을 구성하는 초성, 중성, 종성을 분리한 뒤 이를 전사법에 맞게 전사 한다. 일대일 대응의 기본적인 원칙 (i), 모든 경우 표현 (ii), 최소화 된 방식(iii)을 모두 만족 한다.
```
convertRomanToHangyr('안녕') -> 'Annieng'
```
 * [후쿠이 레이 전사법](http://www.tufs.ac.jp/ts/personal/choes/korean/middle/Sfukui.html)
 * 박승현 전사법

## convertRomanToHangyr
로마자를 다시 한글로 변화 시킨다.
```
convertHangyrToRoman('Annieng') -> '안녕'

```

## getDistanceOfTwoWords
두 글자 사이의 거리(유사도)를 측정한다. 기본적으로 편집거리 알고리즘을 바탕으로 거리를 측정 한다. 
알고리즘의 원리는 한글자에서 몇번의 변화를 통해 다른 글자로 변환되는지를 측정하는것이다. 변화의 종류에는 삽입, 삭제, 대체 등이 있다.
각 변화가 일어나는 경우에 대해  weight를 다르게 주면 좀더 효율적인 거리 측정이 가능하다.
```
getDistanceOfTwoWord(['안녕'], ['안넝']) ->  1

```

* [레빈슈타인 디스턴스](http://hsp1116.tistory.com/41)

## Dict 


### convertFileHangyrToRoman
한글로된 파일을 로마자로 변환 한다. 예를들어 default로 gimci프로젝트에서는 elementaryKorean.hangul.txt데이터 파일을 로마자로 변환하여 elementrayKorean.romanized.txt파일을 생성한다.
```
****elementaryKorean.hangul.txt****
가게
가격
가구
가구
가까워지다


****elementrayKorean.romanized.txt****
gagei
gagieg
gagu
gagu
gaGgaUejida
```

### buildNew
romanized된 txt파일의 정보를 json 형태의 데이터로 생성한다.
> (Romanize된 데이터를 가지고 하기때문에 한글로된 파일은 convertFileHangyrToRoman을 통해 로마자로 된 파일로 우선 변형하여야 한다.)

json의 정보는 txt정보를 가지고 최대 2번 오직 delete연산을 통해 변화가능한 모든 정보를 hashtable형태로 저장한다. delete, insert, transpose, replace 를 최대 2번 수행하는  [Peter Norvig](http://norvig.com/spell-correct.html)알고리즘과는 다른 방식을 가진다. 이 hashtable은 key 와 elem으로 구성되고 key는 모든 변형가능한 데이터이고 elem에는 refer정보 즉, delete가 되기전의 정보를 저장하고 있다.



## Search
입력한 단어에 대하여 예상 가능한 유사 단어를 추천해준다.
tier1이 가장 비슷한 단어이고 다음으로 tier2, 3 이 유사성을 가진다.
```
search('안넝') -> { tier1: [], tier2:['안녕'], tier3['안경', '안정', '애정' ....]}
```
delete 연산을 이용하여 최대 2번까지 delete를 하여 만들어지는 모든 경우에 대한 데이터를(Dict)를 사전에 생성해 놓는다. 사전에 만들어 놓는 Dict를 통하여 통해 4가지 경우에데해서 tier1, 2, 3를 구분하여 유사한 결과를 추출할 수 있다.








