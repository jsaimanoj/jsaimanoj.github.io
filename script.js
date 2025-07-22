// Advanced Neural Network Animation
class NeuralNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.pulses = [];
        this.mouse = { x: 0, y: 0 };
        
        this.resize();
        this.createNodes();
        this.createConnections();
        this.animate();
        
        // Mouse interaction
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.width = rect.width;
        this.height = rect.height;
    }
    
    createNodes() {
        this.nodes = [];
        const nodeCount = Math.floor((this.width * this.height) / 15000);
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 1,
                brightness: Math.random() * 0.8 + 0.2,
                pulsePhase: Math.random() * Math.PI * 2,
                connections: []
            });
        }
    }
    
    createConnections() {
        this.connections = [];
        const maxDistance = 120;
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    this.connections.push({
                        from: i,
                        to: j,
                        distance: distance,
                        strength: 1 - (distance / maxDistance),
                        pulseTime: Math.random() * 1000
                    });
                    
                    this.nodes[i].connections.push(j);
                    this.nodes[j].connections.push(i);
                }
            }
        }
    }
    
    createPulse(fromIndex, toIndex) {
        this.pulses.push({
            from: fromIndex,
            to: toIndex,
            progress: 0,
            speed: 0.02 + Math.random() * 0.03,
            intensity: Math.random() * 0.8 + 0.2,
            color: `hsl(${220 + Math.random() * 60}, 70%, 60%)`
        });
    }
    
    updateNodes() {
        this.nodes.forEach((node, index) => {
            // Gentle movement
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary bounce
            if (node.x < 0 || node.x > this.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.height) node.vy *= -1;
            
            // Keep in bounds
            node.x = Math.max(0, Math.min(this.width, node.x));
            node.y = Math.max(0, Math.min(this.height, node.y));
            
            // Mouse interaction
            const mouseDistance = Math.sqrt(
                
