# ExamJS

> &copy; 2022 Xchuang Corp.
> &copy; BaiG 2022.

### Import

> Download `main.js` or use online version

> Use `<script>` tag to import the code.

```html
<script src="../main.js"></script>
<script src="https://xchuangc.github.io/examjs/main.js"></script>
```

*Download is recommended*

### Create exam widget

> Create a html div tag with id or class.
> Add a script tag with createExamWidget() function.

```html
<div id='exam'></div>
<script>
  createExamWidget('#exam', {/* Question JSON */})
</script>

<div class='exam'></div>
<script>
  createExamWidget('.exam', {/* Question JSON */})
</script>
```

### Question JSON

> Example:

```
{
  title: 'Exam Title',
  question: [
    {
      type: '[(type of input tag)]';
      text: '[Question (Will append to the question) ]',
      prompt : '[Placeholder]',
      questionType : '[FillQ/MCQ]',
      part : '[Part] (Optional)',
      option : ['','',''... (If questionType is MCQ)]
    },
    {},
    {}...
  ],
  partition : [Bool (if true, part is needed)]
}
```

### Element

> FillQuestionElement
> > If the type of question is FillQ, the question element which apend to the exam div will be FillQuestionElement vairable.
> > If the type of question is FillQ, the question element which apend to the exam div will be MCQuestionElement vairable.
> > The submitElement. You can customize it.

> [id] = Cycles
> [question] = Question string
> [type] = input type
> [prompt] = placeholder
> [required] = [*]

> > For example:

```js
FillQuestionElement = `<div id="t[id]"><p>[question]</p><input type="[type]" placeholder="[prompt]" id="question[id]"/>[required]<hr></div>`;
MCQuestionElement = `<div id="t[id]"><p>[question]</p><span id="question[id]"></span>[required]<hr></div>`;
submitElement = `<div><button type="submit" onclick="ab();">Submit</button></div>`;
```

### Functions
`checkAnswer();`
> Check the answer and return a json object.

`examJS.check();`
> Check the answer and return a string.

`examJS.token();`
> Generate a token randomly.

`examJS.antiCheat(e);`
> Anti-cheat function.
> > It will disable the user to open devtools.
> > If user leave the page. There will be a notification.
> > If user don't come back in 20s, the answer will be submitted.
> > For prevent the user have some method to open the devtools and see the answer, add: `// With ExamJS Anti-Cheat.` to the `<script>` tag you want to hide. It will be removed.
> ## e: Event after running the anti-cheat function. (Normally, you should put your `createExamWidget()` function in it.)

`examJS.onlyFoucs();`
> Only foucs on the page.
> > If user leave the page. There will be a notification.
> > If user don't come back in 20s, the answer will be submitted.

### Recommended CSS

```css
.required {
    color: red;
    margin: 0 5px;
}

* {
    font-size: 18px;
    font-weight: 100;
    font-family: "Cambria", serif;
}

div {
    margin: 0 50px;
}

hr {
    border: none;
    border-bottom: 1px solid #ccc;
}

input[type="text"] {
    width: 250px;
    height: 25px;
    outline: none;
    border: none;
    border-bottom: 2px solid rgb(62, 129, 238);
    background: rgba(0, 0, 0, 0.05);
    border-radius: 2px;
}

h1 {
    font-weight: 100;
    font-size: 54px;
}

h2 {
    font-weight: 100;
    font-size: 44px;
}

p {
    font-size: 24px;
    font-weight: 100;
    line-height: 1.5;
}

button {
    width: 250px;
    height: 40px;
    border: none;
    border-radius: 2px;
    background: rgb(62, 129, 238);
    color: #fff;
    font-size: 16px;
    font-weight: 100;
    cursor: pointer;
}

body {
    padding: 50px;
}
```

### Example

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExamJS Test</title>
    <script src="../main.js"></script>
    <link rel="stylesheet" href="test.css">
    <!-- test.css : Recommended CSS -->
</head>

<body>
    <div class="exam"></div>
    <script>
        FillQuestionElement = `<div id="t[id]"><p>[question]</p><input type="[type]" placeholder="[prompt]" id="question[id]"/>[required]<hr></div>`;
        MCQuestionElement = `<div id="t[id]"><p>[question]</p><span id="question[id]"></span>[required]<hr></div>`;
        submitElement = `<div><button type="submit" onclick="location.href='after.html?'+examJS.check()">Submit</button></div>`;
        createExamWidget('.exam', {
            title: 'Test Questions',
            questions: [{
                type: 'text',
                text: 'What is your name?',
                prompt : '',
                questionType : 'FillQ',
                part : 'data'
            }, {
                type: 'number',
                text: 'How old are you?',
                prompt : '',
                questionType : 'FillQ',
                part : 'data'
            },
            {
                type: 'text',
                text: '1 + 1 = ?',
                option : ['2', '3', '4', '5'],
                answer: '2',
                questionType : 'MCQ',
                part : 'Basic MCQ'
            },
            {
                type: 'text',
                text: '2 + 2 = ?',
                option : ['2', '3', '4', '5'],
                answer: '4',
                questionType : 'MCQ',
                part : 'Basic MCQ'
            },
            {
                type: 'text',
                text: '2<sup>2</sup> = ?',
                option : ['2', '3', '4', '5'],
                answer: '4',
                questionType : 'MCQ',
                part : 'Basic MCQ'
            },
            {
                type: 'text',
                text: '&radic;25',
                option : ['2', '3', '4', '5'],
                answer: '5',
                questionType : 'MCQ',
                part : 'Basic MCQ'
            },
            {
                type: 'text',
                text: '&radic;x + 2<sup>2</sup> = 56',
                prompt: 'x = ?',
                answer: '2704',
                questionType : 'FillQ',
                part : 'Basic FillQ'
            },
            {
                type: 'text',
                text: '&int;&nbsp;<sup>1</sup>&frasl;<sub>(5x+3)</sub>&nbsp;dx = <sup>1</sup>&frasl;<sub>5</sub>ln(5x+3)+C',
                option : ['T','F','U'],
                prompt: '',
                answer: 'T',
                questionType : 'MCQ',
                part : 'TFU'
            },
            {
                type: 'text',
                text: '&int;&nbsp;cos2xdx = <sup>1</sup>&frasl;<sub>2</sub>sin2xdx',
                option : ['T','F','U'],
                prompt: '',
                answer: 'F',
                questionType : 'MCQ',
                part : 'TFU'
            },
            {
                type: 'text',
                text: '&int;&nbsp;arctan&nbsp;xdx = x arctan x - <sup>1</sup>&frasl;<sub>2</sub>ln(1+x<sup>2</sup>)+C',
                option : ['T','F','U'],
                prompt: '',
                answer: 'T',
                questionType : 'MCQ',
                part : 'TFU'
            }
        ],
            partition : true
        });
    </script>
</body>

</html>
```