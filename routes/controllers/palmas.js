const pool  = require('../../db/mongo');
const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//---------------Login---------------------

const InfoSalon = async (req, res) => {
    const datos = req.body;
    
    try{
      const salon =  await pool.db('EdificioPalmas').collection('palmas').findOne({ salon: datos.id });
      if (salon) {

        res.json({ status: "ok", salon: salon});
      } else {
        res.json({ status: "ErrorCredenciales" });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
  };

  const PalmasBot = async (req, res) => {
    const datos = req.body;
    
    try{
      const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "Eres un asistente virtual cuya función es brindar información específica sobre el salón que te indiquen. Responde de forma cordial y directa únicamente a consultas relacionadas con ese salón. Si te hacen preguntas fuera de ese tema o no cuentas con los datos necesarios, informa que solo puedes ofrecer detalles sobre el salón. Si alguien solo dice 'hola', saluda de manera amable y pregunta qué desean saber sobre el salón. Evita compartir información no solicitada por el usuario." 
        },
        { role: "user", content: datos.pregunta + " " + JSON.stringify(datos.salon)  }
      ],
      max_tokens: 300, 
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    res.json({ status: "ok", respuesta: response });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
  };


  module.exports = { InfoSalon, PalmasBot };