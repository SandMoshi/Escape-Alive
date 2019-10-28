const story = [
    {
        chapter: 0,
        music: false,
        textArray: [
            "You walk into a bar, it's cold outside. You can hear the rain pounding on the timber roof. You sit down and take off your jacket and delicately try to shake some of the rain off.",
            "You call over to the bartender. \"Hey, slow night?\""
        ],
        options:{
            a: {
                buttonText: 'Option 1',
                goToChapter: 1,
            },
            b: {
                buttonText: 'Option 2',
                goToChapter: 2,
            },
        }
    },
    {
        chapter: 1,
        music: false,
        textArray: [
            "You made it to chapter 1 I am proud of you"
        ],
        options:{
            a: {
                buttonText: 'Option 1 new',
                goToChapter: 3,
            },
            b: {
                buttonText: 'Option 2 new',
                goToChapter: 4,
            },
        }
    },
]


export default story;