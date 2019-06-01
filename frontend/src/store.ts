import Vue from 'vue';
import Vuex from 'vuex';

import { init as initAuth } from './auth';
import EXAMS from './schema/data/exams';
import { Exam, instanceOfCodeExercise, instanceOfTrueOrFalseExercise, Exercise, TrueOrFalseExercise, CodeExercise, instanceOfOutputSolution, OutputSolution, ErrorSolution } from './schema/types/exam.interface';
import { FormAnswer } from './schema/types/answer.interface';
import { User } from 'firebase';
import { correctExam, correctExercise, outcome, Outcome } from './valutation';

Vue.use(Vuex);

export enum TestStatus {
  NONE,
  IN_PROGRESS,
  FINISHED
}

interface StoreStatus {
  user: null | User;
  drawer: boolean;
  footer: boolean;
  title: string;
  stateBar: {
    visibility: boolean;
    value: number;
    color: string;
  };
  test: {
    timer: {
      time: number;
      duration: number;
      paused: boolean;
    };
    valutation: {
      points: {
        code: number;
        trueOrFalse: number;
      };
      score: number;
    };
    interval: number | null;
    exam: number;
    exercise: number;
    answers: FormAnswer[];
    showScore: boolean;
    status: TestStatus;
  };
  exams: Exam[];
}

const store = new Vuex.Store<StoreStatus>({
  state: {
    user: null,
    drawer: false,
    footer: true,
    title: 'UNITN TRONCHET',
    stateBar: {
      visibility: false,
      value: 0,
      color: 'accent'
    },
    test: {
      timer: {
        time: 0,
        duration: 40 * 60,
        paused: false
      },
      valutation: {
        points: {
          code: 1,
          trueOrFalse: 0.25
        },
        score: 0
      },
      interval: 0,
      exam: -1,
      exercise: 0,
      answers: [],
      showScore: false,
      status: TestStatus.NONE
    },
    exams: EXAMS
  },
  getters: {
    loggedIn: state => state.user !== null,
    showDrawer: (state, getters) => getters.loggedIn && state.drawer,
    timeTitle: state => {
      const min = Math.floor(state.test.timer.time / 60);
      const sec = state.test.timer.time % 60;
      return `${min} : ${sec}`;
    },
    scoreTitle: (state, getters) => {
      const score = state.test.valutation.score;
      const total = getters.totalScore;
      return `${score} / ${total}`;
    },
    currentExam: state => state.exams[state.test.exam],
    currentExercise: (state, getters) => getters.currentExam.exercises[state.test.exercise],
    currentAnswer: state => state.test.answers[state.test.exercise],
    currentValutation: (_state, getters) => correctExercise(getters.currentAnswer, getters.currentExercise),
    exercisesAmount: (_state, getters) => getters.currentExam.exercises.length,
    isTrueOrFalseExercise: (_state, getters) => instanceOfTrueOrFalseExercise(getters.currentExercise),
    points: state => state.test.valutation.points,
    outcome: (_state, getters) => outcome(getters.scoreProgress),
    toolbarTitle: (state, getters) => {
      switch (state.test.status) {
        case TestStatus.NONE:
          return state.title;
        case TestStatus.IN_PROGRESS:
          return getters.timeTitle;
        case TestStatus.FINISHED:
          return getters.scoreTitle;
      }
    },
    timeProgress: state => Math.floor((state.test.timer.time / state.test.timer.duration) * 100),
    scoreProgress: (state, getters) => Math.floor((state.test.valutation.score / getters.totalScore) * 100),
    timeFinished: state => state.test.timer.time === state.test.timer.duration,
    inProgress: state => state.test.status === TestStatus.IN_PROGRESS,
    finished: state => state.test.status === TestStatus.FINISHED,
    totalScore: (_state, getters) => {
      return getters.currentExam.exercises.reduce((acc, exercise) => acc + (instanceOfCodeExercise(exercise) ? getters.points.code : getters.points.trueOrFalse), 0);
    }
  },
  mutations: {
    // User
    setUser: (state, user) => {
      state.user = user;
    },
    // Toolbar
    setTitle: (state, title) => {
      state.title = title;
    },
    // Footer
    setFooter: (state, value) => {
      state.footer = value;
    },
    // Drawer
    setDrawer: (state, value) => {
      state.drawer = value;
    },
    // State Bar
    setStateBarVisibility: (state, value) => {
      state.stateBar.visibility = value;
    },
    setStateBarColor: (state, value) => {
      state.stateBar.color = value;
    },
    setStateBarValue: (state, value) => {
      state.stateBar.value = value;
    },
    // Test Status
    setTestStatus: (state, value) => {
      state.test.status = value;
    },
    // Time
    setTime: (state, value) => {
      state.test.timer.time = value;
    },
    setPaused: (state, value) => {
      state.test.timer.paused = value;
    },
    // Exam
    setCurrentExam: (state, value) => {
      state.test.exam = value;
    },
    setCurrentExercise: (state, value) => {
      state.test.exercise = value;
    },
    setAnswers: (state, value) => {
      state.test.answers = value;
    },
    setTrueOrFalseAnswer: (state, value) => {
      const { index, value: val } = value;
      state.test.answers[state.test.exercise].trueOrFalse.splice(index, 1, val);
    },
    setCodeAnswer: (state, value) => {
      state.test.answers.splice(state.test.exercise, 1, value);
    },
    setShowScore: (state, value) => {
      state.test.showScore = value;
    },
    // Score
    setScore: (state, value) => {
      state.test.valutation.score = value;
    },
    // Interval
    setInterval: (state, value) => {
      state.test.interval = value;
    }
  },
  actions: {
    // User
    setUser: ({ commit, dispatch }, user) => {
      commit('setUser', user);
      if (!user) {
        dispatch('stopExam');
      }
    },
    // Toolbar
    setTitle: ({ commit }, title: string) => {
      commit('setTitle', title);
    },
    // Footer
    showFooter: ({ commit }) => {
      commit('setFooter', true);
    },
    hideFooter: ({ commit }) => {
      commit('setFooter', false);
    },
    // Drawer
    showDrawer: ({ commit }) => {
      commit('setDrawer', true);
    },
    hideDrawer: ({ commit }) => {
      commit('setDrawer', false);
    },
    toggleDrawer: ({ state, commit }) => {
      commit('setDrawer', !state.drawer);
    },
    // State Bar
    showStateBar: ({ commit }) => {
      commit('setStateBarVisibility', true);
    },
    hideStateBar: ({ commit }) => {
      commit('setStateBarVisibility', false);
    },
    setStateBarColor: ({ commit }, color: string) => {
      commit('setStateBarColor', color);
    },
    setStateBarValue: ({ commit }, value: number) => {
      commit('setStateBarValue', value);
    },
    resetStateBarValue: ({ commit }) => {
      commit('setStateBarValue', 0);
    },
    // Timer
    resetTime: ({ commit, dispatch }) => {
      commit('setTime', 0);
      dispatch('updateStateBar');
    },
    incrementTime: ({ state, getters, commit, dispatch }) => {
      commit('setTime', state.test.timer.time + 1);
      dispatch('updateStateBar');
      if (getters.timeFinished) {
        dispatch('finishExam');
      }
    },
    pauseTimer: ({ commit }) => {
      commit('setPaused', true);
    },
    playTimer: ({ commit }) => {
      commit('setPaused', false);
    },
    // Exam
    createAnswers: ({ getters, commit }) => {
      const exercises = (getters.currentExam as Exam).exercises;
      const answers = exercises.map(exercise => ({
        type: instanceOfTrueOrFalseExercise(exercise) ? 'TRUE_OR_FALSE' : '',
        output: '',
        row: 0,
        cause: '',
        trueOrFalse: instanceOfTrueOrFalseExercise(exercise) ? exercise.map(_ => null) : []
      }) as FormAnswer);
      commit('setAnswers', answers);
    },
    setCurrentExam: ({ commit, dispatch }, index: number) => {
      commit('setCurrentExam', index);
      if (index !== -1) {
        dispatch('createAnswers');
      }
    },
    setCurrentExamFromId: ({ state, dispatch }, examId: string) => {
      const exam = state.exams.findIndex(e => e.id === examId);
      dispatch('setCurrentExam', exam);
    },
    setCurrentExercise: ({ commit }, exercise: number) => {
      commit('setCurrentExercise', exercise);
    },
    setTrueOrFalseAnswer: ({ commit }, answer) => {
      commit('setTrueOrFalseAnswer', answer);
    },
    setCodeAnswer: ({ commit }, answer) => {
      commit('setCodeAnswer', answer);
    },
    showScore: ({ commit }) => {
      commit('setShowScore', true);
    },
    showSolutions: ({ commit }) => {
      commit('setShowScore', false);
    },
    back: ({ state, commit }) => {
      commit('setCurrentExercise', state.test.exercise - 1);
    },
    next: ({ state, commit }) => {
      commit('setCurrentExercise', state.test.exercise + 1);
    },
    // Score
    resetScore: ({ commit }) => {
      commit('setScore', 0);
    },
    setScore: ({ commit }, score: number) => {
      commit('setScore', score);
    },
    // Interval
    setInterval: ({ state, commit }, interval: number) => {
      if (state.test.interval) {
        clearInterval(state.test.interval);
      }
      commit('setInterval', interval);
    },
    clearInterval: ({ state, commit }) => {
      if (state.test.interval) {
        clearInterval(state.test.interval);
      }
      commit('setInterval', null);
    },
    // Update State Bar
    updateStateBarOnTime: ({ state, dispatch }) => {
      const perc = (state.test.timer.time / state.test.timer.duration) * 100;
      dispatch('setStateBarValue', perc);
      switch (perc) {
        case 0:
          dispatch('setStateBarColor', 'success');
          break;
        case 15:
          dispatch('setStateBarColor', 'accent');
          break;
        case 75:
          dispatch('setStateBarColor', 'warning');
          break;
        case 95:
          dispatch('setStateBarColor', 'error');
          break;
      }
    },
    updateStateBarOnScore: ({ state, getters, dispatch }) => {
      const perc = (state.test.valutation.score / getters.totalScore) * 100;
      dispatch('setStateBarValue', perc);
      switch (getters.outcome) {
        case Outcome.INDECENTE:
        case Outcome.PESSIMO:
          dispatch('setStateBarColor', 'error');
          break;
        case Outcome.BOCCIATO:
          dispatch('setStateBarColor', 'warning');
          break;
        case Outcome.PROMOSSO:
          dispatch('setStateBarColor', 'accent');
          break;
        case Outcome.GRANDE:
          dispatch('setStateBarColor', 'success');
          break;
      }
    },
    // Application
    updateStateBar: ({ getters, dispatch }) => {
      if (getters.inProgress) {
        dispatch('updateStateBarOnTime');
      }
      else if (getters.finished) {
        dispatch('updateStateBarOnScore');
      }
    },
    startTimer: ({ state, dispatch }) => {
      dispatch('resetTime');
      dispatch('playTimer');
      dispatch('updateStateBar');
      const interval = setInterval(() => {
        if (!state.test.timer.paused) {
          dispatch('incrementTime');
        }
      }, 1000);
      dispatch('setInterval', interval);
    },
    correctExam: ({ state, getters, dispatch }) => {
      const answers = state.test.answers;
      const exercises: Exercise[] = getters.currentExam.exercises;
      const points = getters.points;
      const score = correctExam(answers, exercises, points);
      dispatch('setScore', score);
    },
    refreshExam: ({ getters, dispatch }) => {
      dispatch('startExam', getters.currentExam.id);
    },
    startExam: ({ commit, dispatch }, exam: string) => {
      dispatch('resetScore');
      dispatch('setCurrentExamFromId', exam);
      dispatch('setCurrentExercise', 0);
      dispatch('resetStateBarValue');
      dispatch('showStateBar');
      commit('setTestStatus', TestStatus.IN_PROGRESS);
      dispatch('startTimer');
    },
    finishExam: ({ commit, dispatch }) => {
      commit('setTestStatus', TestStatus.FINISHED);
      dispatch('clearInterval');
      dispatch('correctExam');
      dispatch('updateStateBar');
      dispatch('showScore');
    },
    stopExam: ({ commit, dispatch }) => {
      commit('setTestStatus', TestStatus.NONE);
      dispatch('setCurrentExam', -1);
      dispatch('hideStateBar');
      dispatch('clearInterval');
    }
  }
});

initAuth(store);

export default store;
