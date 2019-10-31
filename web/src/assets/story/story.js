const story = [
    {
        chapter: 0,
        music: 'Echoes_of_Time',
        textArray: [
            "☶⋀☷☱☶ Are you ready? ☷☶☐☶☵",
            "Please make your selection below",
        ],
        options:{
            a: {
                buttonText: 'I\'m Ready',
                goToChapter: 1,
            },
            b: null,
        }
    },
    {
        chapter: 1,
        music: false,
        textArray: [
            "You walk into a bar, it's cold outside. You can hear the rain pounding on the timber roof. You sit down and take off your jacket and delicately try to shake some of the rain off.",
            "You call over to the bartender. \"Hey, slow night?\""
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