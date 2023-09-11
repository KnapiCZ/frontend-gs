
<template>

    <div class="hello">
      <button
          class="profileButtons"
          @click="" >
          Edit Profile
      </button> <!-- vytvorit api na follow -->

      <button  v-if="isSupport"
          class="profileButtons"
         @click="webShare"
          >         
          Share Profile
        </button>

    </div>
</template>

<script>

function	created() {
	    this.isSupport();
	  }

function  data () {
	    return {
	      isSupported : false,
	      url : "https://caniuse.com/web-share",
	      title:"Web API Share",
	      description: "Web API Sharing"
	    }
	  }

function isSupport() {
	      if (navigator.share) {
	        this.isSupported = true;
	      }
        else{ this.isSupported}
	    }
function  webShare() {
	      navigator.share({
	      })
	    }

</script>
  
  
  <style scoped>
  .profileButtons {
    display: inline-block;
    padding: 5px auto;
    margin: 10px 10px;
    width: 40%;
    height: 30px;
    background-color: #2F2F2F;
    font-weight: bold;
    border-radius: 5px;
  }
  </style>


