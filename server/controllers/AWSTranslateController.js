import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate"; // ES Modules import
// const { TranslateClient, TranslateTextCommand } = require("@aws-sdk/client-translate"); // CommonJS import
const config = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-southeast-2' // Optional: Specify your AWS region
}

export const translate = async (data) => {
    try {
        const client = new TranslateClient(config);
        const {targetLang,text} = data;
        const input = { // TranslateTextRequest
            Text: text, // required
            SourceLanguageCode: "auto", // required
            TargetLanguageCode: targetLang, // required
        };
        const command = new TranslateTextCommand(input);
        const response = await client.send(command);
        // { // TranslateTextResponse
        //   TranslatedText: "STRING_VALUE", // required
        //   SourceLanguageCode: "STRING_VALUE", // required
        //   TargetLanguageCode: "STRING_VALUE", // required
        //   AppliedTerminologies: [ // AppliedTerminologyList
        //     { // AppliedTerminology
        //       Name: "STRING_VALUE",
        //       Terms: [ // TermList
        //         { // Term
        //           SourceText: "STRING_VALUE",
        //           TargetText: "STRING_VALUE",
        //         },
        //       ],
        //     },
        //   ],
        //   AppliedSettings: { // TranslationSettings
        //     Formality: "FORMAL" || "INFORMAL",
        //     Profanity: "MASK",
        //     Brevity: "ON",
        //   },
        // };

        return  response.TranslatedText;

    } catch (error) {
        console.log(error);
        return;
    }
}
export const translateFront = async (req,res,next) => {
    try {
        const client = new TranslateClient(config);
        const {targetLang,text} = req.body;
        const input = { // TranslateTextRequest
            Text: text, // required
            SourceLanguageCode: "auto", // required
            TargetLanguageCode: targetLang, // required
        };
        const command = new TranslateTextCommand(input);
        const response = await client.send(command);
        // { // TranslateTextResponse
        //   TranslatedText: "STRING_VALUE", // required
        //   SourceLanguageCode: "STRING_VALUE", // required
        //   TargetLanguageCode: "STRING_VALUE", // required
        //   AppliedTerminologies: [ // AppliedTerminologyList
        //     { // AppliedTerminology
        //       Name: "STRING_VALUE",
        //       Terms: [ // TermList
        //         { // Term
        //           SourceText: "STRING_VALUE",
        //           TargetText: "STRING_VALUE",
        //         },
        //       ],
        //     },
        //   ],
        //   AppliedSettings: { // TranslationSettings
        //     Formality: "FORMAL" || "INFORMAL",
        //     Profanity: "MASK",
        //     Brevity: "ON",
        //   },
        // };

        console.log(response.TranslatedText);

        return  res.json({translatedText: response.TranslatedText});

    } catch (error) {
        console.log(error);
        next(error);
    }
}
