const story = {
    "0": {
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
    "1": {
        chapter: '1',
        music: 'Echoes_of_Time',
        textArray: [
            "June 2014 ",
            '','','','','','',
            "Beirut ",
            '','','','','','',
            "You are sitting in your windowless office at the American embassy in Beirut. The last two years have been spent studying regional terror groups and typing reports while you wait for your first deployment in the field.",
            '','','','','','',
            "Today has been spent reading newspapers. Taking notes on what is being written in arabic articles and translating key points into English.",
            '','','','','','',
            "You put your paper down as a message comes across the news wire..."
        ],
        options:{
            a: {
                buttonText: 'Continue',
                goToChapter: '1b',
            },
            b: null,
        }
    },
    "1b" :{
        chapter: '1b',
        music: 'Echoes_of_Time',
        textArray: [
            "An Al-Qaeda splinter group, known as ISIS and operating out of Syria, crossed over into Iraq and attacked Mosul. Forcing the Iraqi army to retreat. They quickly took control of Iraq's second largest city.",
            '','','','','','',
            "The group also took over several highways, oil production facilities, and the majority of several provinces.",
            '','','','','','',
            "Reports of masscres are widespread.",
            '','','','','','',
            "The region is thrown into chaos.",
        ],
        options:{
            a: {
                buttonText: 'Continue',
                goToChapter: "2",
            },
            b: null,
        }
    },
    "2":{
        chapter: "2",
        music: 'Echoes_of_Time',
        textArray: null,
        imagePath:'iraqSyria3b',
        imageFontSize: '0.35rem',
        options:{
            a: {
                buttonText: 'Continue',
                goToChapter: "3",
            },
            b: null,
        }
    },
}


export default story;