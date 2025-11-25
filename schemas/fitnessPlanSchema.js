const { z } = require("zod");

const summarySchema = z.object({
    goal: z.enum(["lose weight", "maintain weight", "gain weight"]),
    durationDays: z.number().positive().int().nullable().optional(),
    timePerDay: z.string(),
    dietPreference: z.enum([
        "none",
        "balanced",
        "high_protein",
        "vegetarian",
        "vegan",
        "gluten_free",
    ]),
});

const weekSchema = z.object({
    week: z.number().positive().int(),
    workout: z.array(
        z.object({
            day: z.enum([
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ]),
            focus: z.string(),
            exercises: z.array(
                z.object({
                    name: z.string(),
                    sets: z.number().positive().int(),
                    reps: z.number().positive().int(),
                })
            ),
        })
    ),

    nutrition: z.object({
        dailyCalories: z.number().positive().int(),
        macros: z.object({
            protein: z.string(),
            carbs: z.string(),
            fat: z.string(),
        }),
        meals: z.array(
            z.object({
                meal: z.string(),
                items: z.array(z.string()),
            })
        ),
    }),
});

const aiPlanSchema = z.object({
    summary: summarySchema,
    weeklyPlan: z.array(weekSchema),
    tips: z.array(z.string()),
});

module.exports = { aiPlanSchema };














// const yup = require('yup');
// const summarySchema = yup.object({
//     goal: yup.string().oneOf(["lose weight", "maintain weight", "gain weight"]).required(),
//     durationDays: yup.number().optional().positive().integer(),
//     timePerDay: yup.string().required(),
//     dietPreference: yup.string().oneOf([
//         "none",
//         "balanced",
//         "high_protein",
//         "vegetarian",
//         "vegan",
//         "gluten_free",
//     ]).required(),
// }).required();

// const weekSchema = yup.object({
//     week: yup.number().required().positive().integer(),
//     workout: yup.array().of(
//         yup.object({
//             day: yup.string().oneOf(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).required(),
//             focus: yup.string().required(),
//             exercises: yup.array().of(
//                 yup.object({
//                     name: yup.string().required(),
//                     sets: yup.number().required().positive().integer(),
//                     reps: yup.number().required().positive().integer(),
//                 }).required()
//             ).required()
//         }).required()
//     ).required(),

//     nutrition: yup.object({
//         dailyCalories: yup.number().required().positive().integer(),
//         macros: yup.object({
//             protein: yup.string().required(),
//             carbs: yup.string().required(),
//             fat: yup.string().required(),
//         }).required(),
//         meals: yup.array().of(
//             yup.object({
//                 meal: yup.string().required(),
//                 items: yup.array().of(yup.string().required()).required()
//             }).required()
//         ).required()
//     }).required()
// }).required()

// const aiPlanSchema = yup.object({
//     summary: summarySchema,
//     weeklyPlan: yup.array().of(weekSchema).required(),
//     tips: yup.array().of(yup.string().required()).required()
// });


// module.exports = { aiPlanSchema };