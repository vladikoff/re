(function(global) {
  class Floor {
    constructor(pattern) {
      this.pattern = pattern;
      const width = 1;
      const padding = 0.1;

      this.mesh = new THREE.Object3D();

      const obsidian = Loader.loadTexture('res/obsidian564x564.jpg');
      const lava = Loader.loadTexture('res/lava128x128.jpg');
      const cubeGeometry = new THREE.BoxGeometry(width, width, width);

      let grassMap = Loader.loadTexture('res/grass01.jpg');
      let grassNormalMap = Loader.loadTexture('res/grass01_n.jpg');
      let grassHeightMap = Loader.loadTexture('res/grass01_h.jpg');
      let grassSpecularMap = Loader.loadTexture('res/grass01_s.jpg');

      let dirtMap = Loader.loadTexture('res/dirt.png');
      let dirtNormalMap = Loader.loadTexture('res/dirt_n.png');

      let grassBillboardMap = Loader.loadTexture('res/grass-billboard.png');

      const materials = {
        /* water */
        0: new THREE.MeshStandardMaterial({
          roughness: 0.2,
        }),
        /* grass */
        1: new THREE.MeshStandardMaterial({
          map: grassMap,
          normalMap: grassNormalMap,
          metalness: 0.1,
          roughness: 0.9,
        }),
        /* dirt */
        2: new THREE.MeshStandardMaterial({
          map: dirtMap,
          normalMap: dirtNormalMap,
          roughness: 0.7,
          metalness: 0.2,
        }),
        /* dunno */
        3: new THREE.MeshStandardMaterial({
          color: 'black'
        }),
          /* window */
        4: new THREE.MeshStandardMaterial({
          color: 0xeeeeff,
          opacity: 0.3,
          transparent: true,
          metalness: 0.5,
          roughness: 0,
        }),

        5: new THREE.MeshStandardMaterial({
          map: obsidian
        }),
        6: new THREE.MeshStandardMaterial({
          map: lava
        }),
      };
      this.materials = materials;

      let geometries = [];
      for(let i = 0; i < 7; i++) {
        geometries[i] = new THREE.Geometry();
      }

      for (let [y, plane] of this.pattern.entries()) {
        const x_width = plane.length;
        for (let [x, row] of plane.entries()) {
          const z_width = row.length;
          for (let [z, elm] of row.entries()) {
            if (elm === undefined) { continue;  }

            const cube = new THREE.Mesh(cubeGeometry);

            cube.position.set(
              (z - z_width / 2) * (width + padding),
              (width + padding) * y,
              (x - x_width / 2) * (width + padding));

            let geometry = geometries[elm];
            cube.updateMatrix();
            geometry.merge(cubeGeometry, cube.matrix);
          }
        }
      }

      for(let i = 0; i < geometries.length; i++) {
        const mesh = new THREE.Mesh(geometries[i], materials[i]);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.mesh.add(mesh);
      }
    }

    update(frame) {
    }
  }

  class MinecraftIsland extends Floor {
    constructor() {
      const f1 = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

      const f2 = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1, , , , , , , , ,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1, , , , , , , , , , ,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1, , , , , , , , , , , ,1,1,1],
        [1,1,1,1,1,1,1,1,1,1, , , , , , , , , , , , , ,1,1],
        [1,1,1,1,1,1, , , , , , , , , , , , , , , , , , , ,],
        [1, , , , , , , , , , , , , , , ,2,2, , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,2,2, , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,]];


      const f3 = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1, , , , , , , , , ,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1, , , , , , , , , , , ,1,1,1],
        [1,1,1,1,1,1,1,1,1,1, , , , , , , , , , , , , ,1,1],
        [ , , , , , , ,2,2, , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,2,2, , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,2,2, , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,]];


      const f4 = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [ , ,1,1,1,1,1,2,2,1,1,1, , , , , , , , , ,1,1,1,1],
        [ , , ,1,1, , ,2,2, ,1, , , , , , , , , , , ,1,1,1],
        [ , , , , , , ,2,2, , , , , , , , , , , , , , ,1,1],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,2,2, , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,2,2, , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,]];

      const f5 = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,2, , , , , , , ,2,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,2, , , , , , , ,2,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,2, , , , , , , ,2,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1, ,2, , , , , , , ,2,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1, , ,2, , , , , , , ,2,1,1,1,1,1,1,1,1,1,1],
        [1,1,1, , , ,2, , , , , , , ,2,1,1,1,1,1,1,1,1,1,1],
        [1,1,1, , , ,2, , , , , , ,2,1,1,1,1,1,1,1,1,1,1,1],
        [1,1, , , , ,2, , , , , ,2, , , , , ,1,1,1,1,1,1,1],
        [1,1, , , , ,2, , ,2,2,2, , , , , , , , , ,1,1,1,1],
        [1, , , , , , , , , , , , , , , , , , , , , ,1,1,1],
        [ , , , , , , , , , , , , , , , , , , , , , , ,1,1],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,2,2, , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,2,2, , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,]];

      const f6 = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1, , ,1, , ,1,1, , ,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1, , , , , , , , , , , ,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1, , , ,2,4,4,4,4,4,2, , , ,1,1,1,1,1,1, ,1],
        [1,1,1,1, , ,2, , , , , , , ,2, , , , ,1,1,1, , ,1],
        [1,1,1, , , ,4, , , , , , , ,4, , , , ,1,1,1, , ,1],
        [1,1,1, , , ,4, , , , , , , ,4, , , ,1,1,1, , , ,1],
        [1,1,1, , , ,4, , , , , , , ,4, , ,1,1,1,1,1, , ,1],
        [1,1,1, , , ,4, , , , , , , ,4, , ,1,1,1,1,1,1, ,1],
        [1,1, , , , ,4, , , , , , , ,2, , ,1,1,1,1,1, , ,1],
        [1,1, , , , ,4, , , , , , ,2, , , , ,1,1,1,1, , ,1],
        [1, , , , , ,4, , , , , ,2, , , , , , , ,1,1,1, ,1],
        [ , , , , , ,2, , ,4,4,2, , , , , , , , , , ,1,1,1],
        [ , , , , , , , , , , , , , , , , , , , , , , ,1,1],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,2,2, , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,2,2, , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,]];

      const f7 = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1, , , , , , , , , , ,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1, , , , , , , , , , , ,1,1,1,1,1,1,1,1,1,1],
        [1,1,1, , , , ,2,4,4,4,4,4,2, , , ,1,1,1,1,1,1, ,1],
        [1,1, , , , ,2, , , , , , , ,2, , , , ,1,1,1, , ,1],
        [1,1, , , , ,4, , , , , , , ,4, , , , , ,1,1, , ,1],
        [1,1, , , , ,4, , , , , , , ,4, , , , , , , , , ,1],
        [1, , , , , ,4, , , , , , , ,4, , , ,1,1,1, , , ,1],
        [1, , , , , ,4, , , , , , , ,4, , , ,1,1,1,1, , ,1],
        [1, , , , , ,4, , , , , , , ,2, , , , ,1,1, , , ,1],
        [ , , , , , ,4, , , , , , ,2, , , , , , , , , , , ,],
        [ , , , , , ,4, , , , , ,2, , , , , , , , , , , , ,],
        [ , , , , , ,2, , ,4,4,2, , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,1,1, , , , , , , ,],
        [ , , , , , , , , , , , , , , ,1,2,2,1, , , , , , ,],
        [ , , , , , , , , , , , , , , ,1,2,2,1, , , , , , ,],
        [ , , , , , , , , , , , , , , , ,1,1, , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,]];

      const f8 = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1, , ,1,1,1,1,1, , ,1,1,1,1,1,1,1,1,1,1,1],
        [1,1, , , , , , , , , , , , , , , , , , ,1,1,1,1,1],
        [1, , , , , , , , , , , , , , , , , , , ,1,1,1,1,1],
        [1, , , , , , ,2,2,2,2,2,2,2, , , , , , , ,1,1,1,1],
        [1, , , , , ,2, , , , , , , ,2, , , , , , , ,1,1,1],
        [1, , , , , ,2, , , , , , , ,2, , , , , , , , ,1,1],
        [ , , , , , ,2, , , , , , , ,2, , , , , , , , , , ,],
        [ , , , , , ,2, , , , , , , ,2, , , , , , , , , , ,],
        [ , , , , , ,2, , , , , , , ,2, , , , , , , , , , ,],
        [ , , , , , ,2, , , , , , , ,2, , , , , , , , , , ,],
        [ , , , , , ,2, , , , , , ,2, , , , , , , , , , , ,],
        [ , , , , , ,2, , , , , ,2, , , , , , , , , , , , ,],
        [ , , , , , ,2,2,2,2,2,2, , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,1,1, , , , , , , ,],
        [ , , , , , , , , , , , , , , ,1,1,1,1, , , , , , ,],
        [ , , , , , , , , , , , , , ,1,1,1,1,1,1, , , , , ,],
        [ , , , , , , , , , , , , , ,1,1,1,1,1,1, , , , , ,],
        [ , , , , , , , , , , , , , , ,1,1,1,1, , , , , , ,],
        [ , , , , , , , , , , , , , , , ,1,1, , , , , , , ,]];

      const f9 = [
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , ,2,2,2,2,2,2,2, , , , , , , , , , , ,],
        [ , , , , , , ,2, , , , , ,2, , , , , , , , , , , ,],
        [ , , , , , , ,2, , , , , ,2, , , , , , , , , , , ,],
        [ , , , , , , ,2, , , , , ,2, , , , , , , , , , , ,],
        [ , , , , , , ,2, , , , , ,2, , , , , , , , , , , ,],
        [ , , , , , , ,2, , , , , ,2, , , , , , , , , , , ,],
        [ , , , , , , ,2, , , , ,2, , , , , , , , , , , , ,],
        [ , , , , , , ,2,2,2,2,2,2, , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,1,1, , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,1,1, , , , , , , ,],
        [ , , , , , , , , , , , , , ,1,1,1,1,1,1, , , , , ,],
        [ , , , , , , , , , , , , , ,1,1,1,1,1,1, , , , , ,],
        [ , , , , , , , , , , , , , , , ,1,1, , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,1,1, , , , , , , ,]];

      const f10 = [
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , ,2,2,2,2,2, , , , , , , , , , , , ,],
        [ , , , , , , , ,2,2,2,2,2, , , , , , , , , , , , ,],
        [ , , , , , , , ,2,2,2,2,2, , , , , , , , , , , , ,],
        [ , , , , , , , ,2,2,2,2,2, , , , , , , , , , , , ,],
        [ , , , , , , , ,2,2,2,2,2, , , , , , , , , , , , ,],
        [ , , , , , , , ,2,2,2,2, , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , , , , ,1,1, , , , , , , ,],
        [ , , , , , , , , , , , , , , ,1,1,1,1, , , , , , ,],
        [ , , , , , , , , , , , , , , ,1,1,1,1, , , , , , ,],
        [ , , , , , , , , , , , , , , , ,1,1, , , , , , , ,],
        [ , , , , , , , , , , , , , , , , , , , , , , , , ,]];

      super([f1, f2, f3, f4, f5, f6, f7, f8, f9, f10]);
    }
  }

  class lavaNode extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        inputs: {
          water: new NIN.TextureInput(),
        }
      });

      this.outputs.depthUniforms = new NIN.Output();
      this.outputs.depthUniforms.node = this;

      this.depthUniforms = THREE.UniformsUtils.clone(THREE.SSAOShader.uniforms);
      this.depthRenderTarget = new THREE.WebGLRenderTarget(640, 360, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat
      });
      this.depthMaterial = new THREE.MeshDepthMaterial();
      this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
      this.depthMaterial.blending = THREE.NoBlending;

      demo.renderer.shadowMap.enabled = true;
      demo.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      var light = new THREE.DirectionalLight(0xffffff, 1, 100);
      this.directionalLight = light;
      light.position.set(10, 10, 10);
      light.castShadow = true;
      light.shadow.mapSize.width = 1024 * 2;
      light.shadow.mapSize.height = 1024 * 2;
      light.shadow.camera.near = 1;
      light.shadow.camera.far = 50;
      light.shadow.camera.left = -10;
      light.shadow.camera.right = 20;
      light.shadow.camera.bottom = -10;
      light.shadow.camera.top = 30;
      light.shadow.camera.position.set(10, 10, 10);
      light.shadow.camera.lookAt(new THREE.Vector3(0, 0, 0));
      let helper = new THREE.CameraHelper(light.shadow.camera);
      this.scene.add(light);
      //this.scene.add(helper);
      var hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
      this.scene.add(hemisphereLight);
      this.hemisphereLight = hemisphereLight;

      this.scene.add(new THREE.AmbientLight(0x111111));

      this.minecraftIsland = new MinecraftIsland();
      this.minecraftIsland.mesh.visible = false;
      this.scene.add(this.minecraftIsland.mesh);

      this.skybox = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1600, 900, 1600),
        new THREE.ShaderMaterial(SHADERS.starrySky)
      );

      this.skybox.position.y = 100;

      this.skybox.material.side = THREE.BackSide;
      this.scene.add(this.skybox);

      this.resize();
    }

    update(frame) {
      const baseFrame = 8200;

      this.minecraftIsland.materials[0].map = this.inputs.water.getValue();

      let angle = (frame - baseFrame) / 400;
      let daylight = Math.cos(Math.PI + Math.PI / 2 + angle * 1.5);

      this.hemisphereLight.intensity = clamp(0, daylight / 2, 1);

      this.directionalLight.position.x = Math.cos(angle) * 30;
      this.directionalLight.position.y = 10 + daylight * 10;
      this.directionalLight.position.z = Math.sin(angle) * 30;

      this.directionalLight.shadow.camera.position.copy(this.directionalLight.position);
      this.directionalLight.shadow.camera.lookAt(new THREE.Vector3(0, 0, 0));

      this.minecraftIsland.update(frame); 

      this.camera.position.set(0.5, 5, 20);
      this.camera.lookAt(new THREE.Vector3(0, -10, -10));

      if (frame < baseFrame + 900) {
        this.minecraftIsland.mesh.visible = true;
      }

      this.skybox.material.uniforms.stage.value = (BEAN - 2 + 5 * 3) % 24;
      this.skybox.material.uniforms.frame.value = frame;
    }

    render(renderer) {
      renderer.overrideMaterial = null;
      renderer.render(this.scene, this.camera, this.renderTarget, true);
      renderer.overrideMaterial = this.depthMaterial;
      renderer.render(this.scene, this.camera, this.depthRenderTarget, true);
      this.outputs.render.setValue(this.renderTarget.texture);
      this.outputs.depthUniforms.setValue(this.depthUniforms);
      this.depthUniforms.tDiffuse.value = this.renderTarget.texture;
      this.depthUniforms.tDepth.value = this.depthRenderTarget.texture;
      this.depthUniforms.size.value.set(16 * GU, 9 * GU);
      this.depthUniforms.cameraNear.value = this.camera.near;
      this.depthUniforms.cameraFar.value = this.camera.far;
      this.depthUniforms.onlyAO.value = false;
      this.depthUniforms.aoClamp.value = 0.5;
      this.depthUniforms.lumInfluence.value = 0.5;
    }

    resize() {
      this.renderTarget.setSize(16 * GU, 9 * GU);
      this.depthRenderTarget.setSize(16 * GU, 9 * GU);
    }
  }

  global.lavaNode = lavaNode;
})(this);
