import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY = 'HIGH_SCORES';

export const fetchHighScores = async () => {
    try {
        let highScores = await AsyncStorage.getItem(STORAGE_KEY);
        if (highScores === null) {
            return [];
        }
        return parseHighScores(highScores);
    } catch (error) {
        console.log('Error fetching High Scores', error);
    }
}
const parseHighScores = (highScores) =>
    JSON.parse(highScores).map((highScore) => {
        highScore.createdAt = new Date(highScore.createdAt)
        return highScore;
})

export const mergeHighScores = (highScores, total) => {
    const score = {
        score: total,
        createdAt: new Date()
    };
    return [...highScores, score];
}

export const saveHighScores = (highScores) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(highScores));
}