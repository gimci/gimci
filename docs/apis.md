#APIs
## convertHangyrToRoman
한글을 구성하는 초성, 중성, 종성을 분리한 뒤 이를 전사법에 맞게 전사 한다. 일대일 대응의 기본적인 원칙 (i), 모든 경우 표현 (ii), 최소화 된 방식(iii)을 모두 만족 한다.
```
convertRomanToHangyr('안녕') -> 'Annieng'
```

* Bagsynghien rule (박승현 전사법,document to be made shortly)

## convertRomanToHangyr
로마자를 다시 한글로 변화 시킨다.
```
convertHangyrToRoman('Annieng') -> '안녕'
```
효율적인 변환을 위해 박승현 전사법의 모음이 가지는 특성을 이용한다.

1. 대문자 모음은 추가적인 초성을 가지지 않는다.
2. 소문자 모음은 무조건 자음을 초성으로 가지거나 대문자 모음뒤에 나타난다.


위이 2가지 특성을 고려하여 모음을 기준으로 모음 앞에서 단어를 잘라낸다음 뒤에서부터 읽어나가면서 모음이 소문자일 경우와 대문자일 경우를 나누어서 글자를 결합해 나간다.
```
'Annieng' -> ['Ann', 'i', 'eng'] -> ['Ann', 'ieng'] -> ['An', 'nieng']
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
한글로된 파일을 로마자로 변환 한다. 예를들어 default로 gimci프로젝트에서는 elementaryKorean.hangul.txt데이터 파일을 로마자로 변환하여 elementaryKorean.romanized.txt파일을 생성한다.
>elementaryKorean.hangul.txt의 데이터들은 의미가 존재하는 알맞은 단어들을 가지고 있다.

```
****elementaryKorean.hangul.txt****
가게
가격
가구
가구
가까워지다
```

```
****elementaryKorean.romanized.txt****
gagei
gagieg
gagu
gagu
gaGgaUejida
```

### buildNew
romanized된 txt파일의 정보를 json 형태의 데이터로 생성한다.
> (Romanize된 데이터를 가지고 하기때문에 한글로된 파일은 convertFileHangyrToRoman을 통해 로마자로 된 파일로 우선 변형하여야 한다.)

json의 정보는 elementaryKorean.romanized.txt의 words정보를 가지고 최대 2번 오직 delete연산을 통해 변화가능한 모든 token을 json파일 형태로 저장한다. delete, insert, transpose, replace 를 최대 2번 수행하는  [Peter Norvig](http://norvig.com/spell-correct.html)알고리즘과는 다른 방식을 가진다. 이 json파일은은 key(base) 와 elem으로 구성되고 key는 모든 변형가능한 데이터(GenerateToken을 통해 생성된 모든token)이고 elem은 refer정보 즉, delete로 변형 되기 전의 word를(elementaryKorean.romanized.txt의 데이터) 가진다.

```
**** elementaryKorean.romanized.txt ****
gagei
gagieg
...
```
```
**** tokenSet of 'gagei' ****
{'gagei', agei', 'ggei', 'gaei', 'gagi', 'gage', 'gei', 'aei', 'agi','age',
 'gei','ggi', 'gge', 'aei', ..... }
```
```
**** elementaryKorean.romanized.dict.json ****
{"gagei":{"refer":["gagei","gangjei"]},"agei":{"refer":["gagei"]}, .....
```
위에서 'gagei'는 GenerateToken을 통해 최대 2번까지 delete연산으로 tokenSet을 만든다. 여기서 'gagei'는 각 tokenSet의 token의 refer가 된다. 따라서 'gagei' 의 refer 는 'gagei'이다. 또한 'gangjei'를 generatedToken을 통해 tokenSet을 만들면 'gagei'가 존재하기때문에 'gangjei'도 'gangei'의 refer에 포함되어 있는것을 확인 할 수 있다.

이렇게 생성된 elementaryKorean.romanized.dict.json은 앞으로 search기능을 사용하기위한 precalculation된 데이터로써 사용된다.



## Search
입력한 단어에 대하여 예상 가능한 유사 단어를 추천해준다. 여러 후보중에 좀더 유사성이 높은 후보를 구분하기위해 tier1, tier2, tier3으로 나누어서 결과를 표시한다. tier1이 가장 비슷한 단어이고 다음으로 tier2, 3 이 차례로 높은 유사성을 가진다.

모든 입력은 convertHangyrToRoman되어 처리되고 다시 결과는 convertRomanToHangyr을 통해 출력된다.
```
search('안녕') -> { tier1: [ '안녕' ], tier2: [], tier3: [ '눈병', '안경', '운명', '인형'... ]}
search('안넝') -> { tier1: [], tier2:['안녕'], tier3: ['안경', '안정', '애정' ....]}
search('앉녕') -> { tier1: [], tier2: [ '안녕', '안정' ], tier3: [ '눈병', '안경' ] }
```
input과 dict(elementaryKorean.romanized.dict)를 비교하는 방식은 다음과 같다.

1. dict === input ----> tier1
2. dict ==== proc(input) ----> tier2
3. delete(dict) === input ----> tier3
4. dict === delete(input) ----> tier3
5. delete(dict) === input ----> tier3
6. dict === delete(input) ----> tier3
7. delete(dict) === delete(input) ----> tier4
8. delete(dict) === prco(delete(input)) ----> tier4

**tier1**이 되는 경우는 1의 경우이다. 1은 input자체가 올바른 데이터일 경우이다. 예를 들어 '안녕'은 dict에 존재하는 표준어이기 때문에 '안녕'일 확률이 가장 높다고 할 수 있다.

**tier2**가 되는 경우는 input자체가 올바르지는 않지만 이것이

**tier3**가 되는 경우는 2, 3의 경우이다. 2의 경우에는 input이 표준어는 표준어에서 delete를 통해 만들어진 경우이다. 3의 경우에는 input이 변형가능한 token들이 표준어일 경우이다. 예를 들어 '안넝'은 '안녕'에서 delete를 통해 생성가능하므로 이경우네는 2의 경우이다. 그리고 '앉녕'이라고 검색할경우 '앉녕'에서 delete를 통해 '안녕'이 되므로 이 경우에는 3의 경우이다.

**tier4**이 되는 경우는 4의 경우이다. 4는 input만 delete를 하는것이아니라 표준어도 delete를 하여 표준어가 되는 경우이다.
예를 들어 input '안녕(Anneing)'은 delete를 통해 '안ㅕㅇ(Anieng)'이 될 수 있다. 또한 dict의 '안경(Angieng)'은 delete를 통해 '안ㅕㅇ(Anneing)'이 될 수 있으므로 이 경우가 4에 해당한다.


우리가 이러한 연산을 빨리할 수 있는 이유는 사전에 buildNew()를 통해 dict를 precalculation하여 delete연산을 최대 2번까지 적용하여 만들어지는 모든 경우에 대한 데이터를(dict)를 사전에 생성하여 refer에 저장해 놓기 때문에 delete(dict)를 계산하지않고 input을 key로하여 해당하는 refer들만 비교하면 되기 떄문이다.
