<template>
  <div class="app-home-card pb-3">
    <v-card class="home-card" flat>
      <v-card-text>
        <h1 class="home-title ma-1">Home</h1>

        <v-img
          class="mt-4 mb-5" :class="{ 'mx-1': isPhone, 'mx-3': !isPhone }"
          height="300"
          contain
          src="./read_the_fucking_manual.png"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        />

        <div class="home-paragraph my-5" :class="{ 'mx-1': isPhone, 'mx-3': !isPhone }">

          <v-alert v-model="alerts.pwa" dismissible outline type="info" class="justify my-4">
            <strong>
              Ora Unitn Tronchet è diventata una PWA. Questo significa che puoi aggiungerla
              alla schermata home di Android e che funziona anche offline. (Per provarla offline,
              chiudere la scheda e riaprirla dopo aver disattivato la connessione)
            </strong>
          </v-alert>

          <p>
            Questo sito è stato pensato per aiutare gli studenti del
            primo anno di informatica dell'
            <b>Università di Trento</b> a prepararsi
            per la parte teorica dell'esame
            <b>Linguaggi di programmazione - modulo 1</b>.
          </p>

          <p>
            Purtroppo sul sito del professore non si trovano gli esami degli anni precedenti e
            le prove vecchie che si trovano sul drive di
            <b>Unitn Informatica</b> sono in buona
            parte senza soluzioni.
          </p>

          <p>
            Per fortuna su questo sito, andando sul
            <b>menu e selezionando un esame</b>, si possono vedere
            i testi delle prove vecchie trovate sul drive e controllarne anche le
            <b>soluzioni</b>. Non solo,
            questo sito permette all'utente di fare una vera e propria
            <b>simulazione</b>, che termina dopo
            un certo tempo e mostra il punteggio ottenuto all'utente e il confronto fra la sua risposta
            e la soluzione.
          </p>

          <p>
            Durante la prova che dura 40 minuti il tempo viene mostrato nella barra in alto al posto del titolo e
            una barra colorata aiuta meglio a capire quanto tempo rimane. Negli esercizi dove viene mostrato del codice
            si può lasciare in bianco o rispondere con l'output o con la riga e causa di eventuali errori a runtime o compiletime.
            Durante l'esame verrà detto se il codice termina o se ci sono errori. Nella simulazione no, perchè se ci si abitua a
            non saperlo poi l'esame sembrerà molto più facile. Negli esercizi con il vero e falso si può lasciare in bianco o
            dare una risposta.
          </p>

          <p>
            Con i pulsanti in basso si possono scorrere gli esercizi. Sempre fra i pulsanti in basso ci sono quelli di pausa per
            fermare il tempo, refresh per far ripartire da capo la simulazione e finish per consegnare prima del tempo. Compare un
            pulsante di copia per copiare i testi degli esercizi con il codice, basta posizionare il mouse sopra al codice.
          </p>

          <p>
            Alla fine dell'esame viene mostrato il risultato, in termini di punteggio, tempo impiegato e percentuale di risposte corrette.
            Premendo sull'icona in alto a destra (non quella del logout) vengono rimostrati gli esercizi, che mostrano la risposta
            data e la soluzione. Blu vuol dire che la risposta è stata lasciata vuota, rosso che era sbagliata, giallo che è stata sbagliata solo
            la tipologia di errore (compiletime/runtime) e verde che era giusta. Per vedere la soluzione basta premere l'icona con l'occhio.
          </p>

          <p>
            Viene assegnato un punto per gli esercizi col codice corretti, zero se essi sono sbagliati o vuoti. Viene assegnato un quarto
            di punto per ogni vero e falso, viene tolto un quarto di punto per ognuno di essi che è stato sbagliato. Se si sbaglia il tipo di errore (compiletime o runtime)
            ma è giusta la riga vengono dati 0.75 punti (sarà così anche all'esame). Questo non accade nella simulazione ma considerando che nella correzione non viene
            controllata la causa dell'errore le cose tornano in pari.
          </p>

          <v-alert v-model="alerts.errors" dismissible outline type="warning" class="justify my-4">
            <strong>È possibile che ci sia qualche errore nei testi o nelle soluzioni, potete scrivermi se li trovate dicendomi esame, esercizio ed errore</strong>
          </v-alert>

          <v-alert v-model="alerts.swipe" dismissible outline type="warning" class="justify my-4">
            <strong>Nei telefoni, al posto delle frecce avanti e indietro basta fare uno swipe ampio a destra o a sinistra</strong>
          </v-alert>

          <v-alert v-model="alerts.spaces" dismissible outline type="warning" class="justify my-4">
            <strong>Negli esercizi dove si risponde con un output, scrivere \n per gli a capo e controllare anche che gli spazi siano giusti</strong>
          </v-alert>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from 'vue-property-decorator';

@Component
export default class AppExamCard extends Vue {
  $vuetify: any;

  private alerts = {
    pwa: true,
    errors: true,
    swipe: true,
    spaces: true
  };

  get isPhone(): boolean {
    return this.$vuetify.breakpoint.name === 'xs';
  }
}
</script>

<style scoped>
.app-home-card {
  height: 100%;
}

.home-card {
  min-height: 100%;
  border-radius: 8px;
}

.home-title {
  text-align: center;
  font-size: 32px;
  font-weight: 400;
}

.home-paragraph p {
  font-size: 16px;
  text-align: justify;
}

.justify {
  text-align: justify;
}
</style>