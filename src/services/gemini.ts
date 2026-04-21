import { GoogleGenAI, Type } from "@google/genai";
import { Matchup, PredictionResult } from "../types";
import { SAMPLE_BATTERS } from "../data/npb-data";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function predictMatch(matchup: Matchup): Promise<PredictionResult> {
  const homeBatters = SAMPLE_BATTERS.filter(b => b.teamId === matchup.homeTeam.id);
  const awayBatters = SAMPLE_BATTERS.filter(b => b.teamId === matchup.awayTeam.id);

  const prompt = `
      你是一位專精於日本職棒 (NPB) 的資深數據分析師。現在是 2026 年球季。
      請針對以下這場即將進行的比賽進行深度數據比對與預測。

      【2026 賽季即時數據】
      
      主隊: ${matchup.homeTeam.name}
      - 團隊戰績: ${matchup.homeTeam.stats.wins}勝 ${matchup.homeTeam.stats.losses}敗 (勝率 ${matchup.homeTeam.stats.winRate})
      - 主場戰績: ${matchup.homeTeam.stats.homeRecord.wins}勝 ${matchup.homeTeam.stats.homeRecord.losses}敗
      - 在 ${matchup.stadium} 的勝率: ${matchup.homeTeam.stats.stadiumPerformance[matchup.stadium] || '未知'}
      - 團隊攻擊力: 平均得分 ${matchup.homeTeam.stats.avgRuns}
      - 團隊投手力: 團隊 ERA ${matchup.homeTeam.stats.era}
      - 先發投手: ${matchup.homePitcher.name} (ERA: ${matchup.homePitcher.era}, WHIP: ${matchup.homePitcher.whip}, 最近勝敗: ${matchup.homePitcher.wins}勝 ${matchup.homePitcher.losses}敗)
      - 核心打線: ${homeBatters.map(b => `${b.name}(AVG:${b.avg}, HR:${b.hr}, OPS:${b.ops})`).join(', ')}
      
      客隊: ${matchup.awayTeam.name}
      - 團隊戰績: ${matchup.awayTeam.stats.wins}勝 ${matchup.awayTeam.stats.losses}敗 (勝率 ${matchup.awayTeam.stats.winRate})
      - 客場戰績: ${matchup.awayTeam.stats.awayRecord.wins}勝 ${matchup.awayTeam.stats.awayRecord.losses}敗
      - 在 ${matchup.stadium} 的勝率: ${matchup.awayTeam.stats.stadiumPerformance[matchup.stadium] || '未知'}
      - 團隊攻擊力: 平均得分 ${matchup.awayTeam.stats.avgRuns}
      - 團隊投手力: 團隊 ERA ${matchup.awayTeam.stats.era}
      - 先發投手: ${matchup.awayPitcher.name} (ERA: ${matchup.awayPitcher.era}, WHIP: ${matchup.awayPitcher.whip}, 最近勝敗: ${matchup.awayPitcher.wins}勝 ${matchup.awayPitcher.losses}敗)
      - 核心打線: ${awayBatters.map(b => `${b.name}(AVG:${b.avg}, HR:${b.hr}, OPS:${b.ops})`).join(', ')}
      
      比賽環境:
      - 體育場: ${matchup.stadium} (請考慮球場的大、小、海拔、是否為巨蛋或露天環境對全壘打與得分的影響)
      
      請依據上述綜合資訊，特別是「投手與打線的對抗」以及「球場特性」，提供專業的預測建議。回覆必須使用繁體中文。
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            winner: { type: Type.STRING, description: "預測勝出的球隊名稱" },
            probability: { type: Type.NUMBER, description: "勝出的機率 (0 to 1)" },
            overUnder: { type: Type.STRING, enum: ["Over", "Under"], description: "預測大小分" },
            overUnderProbability: { type: Type.NUMBER, description: "大小分預測的信心度或機率 (0 to 1)" },
            projectedTotal: { type: Type.NUMBER, description: "預測總分" },
            reasoning: { type: Type.STRING, description: "繁體中文的專業預測理由" }
          },
          required: ["winner", "probability", "overUnder", "overUnderProbability", "projectedTotal", "reasoning"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result as PredictionResult;
  } catch (error) {
    console.error("Gemini Prediction Error:", error);
    throw error;
  }
}
