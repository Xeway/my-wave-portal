const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
  
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
  
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());
  
    let waveTxn = await waveContract.wave("Hello !");
    await waveTxn.wait();
  
    waveCount = await waveContract.getTotalWaves();
  
    waveTxn = await waveContract.connect(randomPerson).wave("Hello 1");
    await waveTxn.wait();

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
  
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave("Hello 2");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randomPerson).wave("Hello 3");
    await waveTxn.wait();

    waveTxn = await waveContract.wave("Hello 4");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
};
  
const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
};
  
runMain();