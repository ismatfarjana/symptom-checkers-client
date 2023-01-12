<template>
  <div>
    <h3>The Diagnosises</h3>
    <div
      v-for="diagnosis in $store.getters.diagnosis"
      :key="diagnosis"
      href="#"
      class="one-diagnosis"
    >
      <h4>Diagnosis:{{ diagnosis.Issue.Name }}</h4>
      <p>Accuracy:{{ diagnosis.Issue.Accuracy }}</p>
      <p>IcdName:{{ diagnosis.Issue.IcdName }}</p>
      <p>Proffesional Name:{{ diagnosis.Issue.ProfName }}</p>
      <p>Ranking:{{ diagnosis.Issue.Ranking }}</p>
      <p>Specialisation:</p>
      <ul
        v-for="Specialisation in diagnosis.Specialisation"
        :key="Specialisation"
        href="#"
      >
        <li>{{ Specialisation.Name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.one-diagnosis {
  background-color: rgb(172, 229, 210);
  border: 2px solid black;
  text-align: left;
  margin: 80px;
  margin-top: 30px;
  padding: 10px 20px;
}
</style>
