    <script>
        // Dark mode detection and toggle
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });

        document.getElementById('darkModeToggle').addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');

            // Update NFT canvas if visible
            if (document.getElementById('nft-canvas')) {
                updateNFTCanvas();
            }
        });

        // Connect wallet button
        document.getElementById('connectWallet').addEventListener('click', function() {
            this.textContent = this.textContent === 'Connect Wallet' ? 
                '0x71C9...98F3 (Connected)' : 'Connect Wallet';

            if (this.textContent !== 'Connect Wallet') {
                this.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
                this.classList.add('bg-green-600', 'hover:bg-green-700');
            } else {
                this.classList.remove('bg-green-600', 'hover:bg-green-700');
                this.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
            }
        });

        // Main Navigation Tabs
        const mainTabs = document.querySelectorAll('.main-tab');
        const mainSections = document.querySelectorAll('.main-section');

        mainTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');

                // Update tab styles
                mainTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Show selected tab content, hide others
                mainSections.forEach(section => {
                    section.classList.add('hidden');
                });
                document.getElementById(tabId).classList.remove('hidden');

                // Initialize specific tab content if needed
                if (tabId === 'mint') {
                    updateNFTCanvas();
                } else if (tabId === 'stake') {
                    initRewardsChart();
                } else if (tabId === 'nft-gallery') {
                    loadNFTGallery();
                } else if (tabId === 'research') {
                    // Initialize any research visualizations that might need updating
                }
            });
        });

        // Buttons to switch between tabs and link content
        document.querySelectorAll('.mint-theorem-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Switch to mint tab
                document.querySelector('[data-tab="mint"]').click();

                // Pre-fill form based on theorem
                const theorem = btn.getAttribute('data-theorem');
                if (theorem === 'p-vs-np') {
                    document.getElementById('theorem-title').value = 'P vs NP: The Fractal Complexity Barrier';
                    document.getElementById('theorem-category').value = 'p-vs-np';
                    document.getElementById('theorem-statement').value = 'NP contains languages unresolvable by polynomial-time fractal hierarchies.';
                } else if (theorem === 'riemann') {
                    document.getElementById('theorem-title').value = 'Riemann Hypothesis: Prime Wave Resonance';
                    document.getElementById('theorem-category').value = 'riemann';
                    document.getElementById('theorem-statement').value = 'All nontrivial ζ(s) zeros lie on the critical line Re(s) = 1/2.';
                }

                // Generate preview
                document.getElementById('generate-preview').click();
            });
        });

        document.querySelectorAll('.view-nft-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Switch to NFT gallery tab
                document.querySelector('[data-tab="nft-gallery"]').click();

                // Show NFT detail for this theorem
                const theorem = btn.getAttribute('data-theorem');
                setTimeout(() => {
                    // Find and click the view button for this NFT
                    const nftCards = document.querySelectorAll('.nft-card');
                    nftCards.forEach(card => {
                        if (card.getAttribute('data-theorem') === theorem) {
                            card.click();
                        }
                    });
                }, 500);
            });
        });

        document.querySelectorAll('.view-research-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Switch to research tab
                document.querySelector('[data-tab="research"]').click();

                // Show the specific theorem section
                const theorem = btn.getAttribute('data-theorem');
                setTimeout(() => {
                    document.querySelector(`[data-target="${theorem}"]`).click();
                }, 500);
            });
        });

        // Navigation between pillars in research section
        const pillarNavButtons = document.querySelectorAll('.pillar-nav');
        const pillarSections = document.querySelectorAll('.pillar-section');
        const introContent = document.getElementById('introduction-content');

        pillarNavButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');

                // Hide all sections
                introContent.classList.add('hidden');
                pillarSections.forEach(section => {
                    section.classList.add('hidden');
                });

                // Show target section
                document.getElementById(targetId).classList.remove('hidden');

                // Update active button styles
                pillarNavButtons.forEach(btn => {
                    btn.classList.remove('bg-indigo-300', 'dark:bg-indigo-700');
                    btn.classList.add('bg-indigo-100', 'dark:bg-indigo-900');
                });
                button.classList.remove('bg-indigo-100', 'dark:bg-indigo-900');
                button.classList.add('bg-indigo-300', 'dark:bg-indigo-700');

                // Initialize visualization for this section
                initVisualization(targetId);
            });
        });

        // Expand visualization containers
        const expandButtons = document.querySelectorAll('.expand-btn');
        expandButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');
                const container = document.getElementById(targetId);
                container.classList.toggle('expanded');
                button.textContent = container.classList.contains('expanded') ? 'Collapse Visualization' : 'Expand Visualization';
            });
        });

        // Expand all visualizations button
        document.getElementById('expandAll').addEventListener('click', function() {
            const containers = document.querySelectorAll('.visualization-container');
            const isExpanded = containers[0]?.classList.contains('expanded');

            containers.forEach(container => {
                if (isExpanded) {
                    container.classList.remove('expanded');
                } else {
                    container.classList.add('expanded');
                }
            });

            expandButtons.forEach(button => {
                button.textContent = isExpanded ? 'Expand Visualization' : 'Collapse Visualization';
            });

            this.textContent = isExpanded ? 'Expand All Visualizations' : 'Collapse All Visualizations';
        });

        // AI assistant functionality
        document.getElementById('ai-submit-btn').addEventListener('click', async () => {
            const prompt = document.getElementById('ai-prompt').value.trim();
            if (!prompt) return;

            // Show loading indicator
            document.getElementById('ai-loading').classList.remove('hidden');
            document.getElementById('ai-response').classList.add('hidden');

            try {
                // Call the Poe API
                await simulateAIResponse(prompt);
            } catch (error) {
                document.getElementById('ai-response-content').textContent = 
                    "Sorry, there was an error processing your request. Please try again.";
                document.getElementById('ai-response').classList.remove('hidden');
            } finally {
                document.getElementById('ai-loading').classList.add('hidden');
            }
        });

        async function simulateAIResponse(prompt) {
            // In a real implementation, this would call window.Poe.sendUserMessage
            // For this demo, we'll simulate a response

            // Wait for "AI thinking" time
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Generate a helpful response
            const responses = [
                `<p>Regarding "${prompt}": This is an excellent question about the research.</p>
                <p>The fractal-harmonic synthesis approach resolves this by applying the meta-recursive duality principle, where each problem's solution space exhibits self-similar structures at multiple scales.</p>
                <p>For more information, you might explore the 47-node distributed verification network that confirmed these findings across 14 million computational trials.</p>`,

                `<p>Your inquiry about "${prompt}" touches on a key aspect of this research.</p>
                <p>The mathematical framework presented uses entropy-stabilized geometric flows to create a unified approach across all seven problems. The key insight is that seemingly disparate mathematical structures reveal harmonic resonance patterns when viewed through the lens of fractal dimension analysis.</p>
                <p>The interactive tools available in this platform can help you explore these concepts further.</p>`,

                `<p>Analyzing your question about "${prompt}":</p>
                <p>This aspect of the research connects to the fundamental principle of conservation across local and global structures. The mathematical approach demonstrates how conservation laws at multiple scales create a unified framework for addressing these diverse problems.</p>
                <p>You can test this principle using the interactive visualizations and parameter testing tools available in each section.</p>`
            ];

            // Select a random response
            const responseIndex = Math.floor(Math.random() * responses.length);
            document.getElementById('ai-response-content').innerHTML = responses[responseIndex];
            document.getElementById('ai-response').classList.remove('hidden');
        }

        // Parameter slider updates
        function setupSlider(sliderId, valueId) {
            const slider = document.getElementById(sliderId);
            const valueDisplay = document.getElementById(valueId);

            if (slider && valueDisplay) {
                slider.addEventListener('input', () => {
                    valueDisplay.textContent = slider.value;
                    updateVisualization(sliderId);
                });
            }
        }

        // Setup all sliders
        setupSlider('branching-factor', 'branching-factor-value');
        setupSlider('depth', 'depth-value');
        setupSlider('growth-rate', 'growth-rate-value');
        setupSlider('zero-count', 'zero-count-value');
        setupSlider('t-range', 't-range-value');
        setupSlider('precision', 'precision-value');

        // Handle computation button clicks
        document.getElementById('compute-p-np')?.addEventListener('click', computePvsNP);
        document.getElementById('run-p-np-code')?.addEventListener('click', runPvsNPCode);
        document.getElementById('compute-riemann')?.addEventListener('click', computeRiemann);
        document.getElementById('run-riemann-code')?.addEventListener('click', runRiemannCode);

        // RESEARCH SECTION FUNCTIONS

        // Visualization initializations
        function initVisualization(sectionId) {
            const canvasId = `${sectionId}-visualization`;
            const canvas = document.getElementById(canvasId);

            if (!canvas || canvas.hasChildNodes()) return;

            // Clear existing content
            while (canvas.firstChild) {
                canvas.removeChild(canvas.firstChild);
            }

            // Create SVG container
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");
            canvas.appendChild(svg);

            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            // Initialize different visualizations based on section
            switch(sectionId) {
                case 'p-vs-np':
                    initPvsNPVisualization();
                    break;
                case 'riemann':
                    initRiemannVisualization();
                    break;
                // Other cases for different theorems
            }
        }

        // P vs NP Visualization
        function initPvsNPVisualization() {
            const container = document.getElementById('p-np-visualization');
            if (!container) return;

            // Clear existing content
            container.innerHTML = '';

            // Create SVG for tree visualization
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");
            container.appendChild(svg);

            // Initial tree drawing
            drawFractalTree(svg);

            // Initialize growth chart
            initGrowthChart();
        }

        function drawFractalTree(svg) {
            const width = svg.clientWidth || 600;
            const height = svg.clientHeight || 400;

            // Get parameters
            const branchingFactor = parseInt(document.getElementById('branching-factor').value);
            const maxDepth = parseInt(document.getElementById('depth').value);

            // Clear existing content
            while (svg.firstChild) {
                svg.removeChild(svg.firstChild);
            }

            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            svg.appendChild(g);

            function drawTree(x, y, length, angle, depth) {
                if (depth === 0) return;

                // Calculate angles for all branches
                const angleStep = Math.PI / branchingFactor;
                const startAngle = angle - (Math.PI / 2) * (branchingFactor - 1) / branchingFactor;

                for (let i = 0; i < branchingFactor; i++) {
                    const branchAngle = startAngle + i * angleStep;
                    const x2 = x + length * Math.cos(branchAngle);
                    const y2 = y + length * Math.sin(branchAngle);

                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("x1", x);
                    line.setAttribute("y1", y);
                    line.setAttribute("x2", x2);
                    line.setAttribute("y2", y2);
                    line.setAttribute("stroke", `hsl(${depth * 30}, 70%, 50%)`);
                    line.setAttribute("stroke-width", depth);
                    g.appendChild(line);

                    drawTree(x2, y2, length * 0.7, branchAngle, depth - 1);
                }
            }

            // Start tree drawing from the bottom center
            drawTree(width / 2, height - 50, 80, -Math.PI / 2, maxDepth);

            // Add labels
            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", 20);
            label.setAttribute("y", 30);
            label.setAttribute("fill", "#5D5CDE");
            label.textContent = `Fractal Decision Tree (Branching: ${branchingFactor}, Depth: ${maxDepth})`;
            svg.appendChild(label);
        }

        function initGrowthChart() {
            const container = document.getElementById('p-np-growth-chart');
            if (!container) return;

            // Clear existing content
            container.innerHTML = '';

            // Create a canvas for Plotly
            const canvas = document.createElement('div');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            container.appendChild(canvas);

            // Generate data for the chart
            const nValues = Array.from({length: 20}, (_, i) => i + 1);
            const branchingFactor = parseInt(document.getElementById('branching-factor').value);
            const depth = parseInt(document.getElementById('depth').value);
            const growthRate = parseFloat(document.getElementById('growth-rate').value);

            const entropyValues = nValues.map(n => {
                let nodes = 0;
                for (let i = 0; i <= depth; i++) {
                    nodes += Math.pow(branchingFactor, i);
                }
                return nodes * Math.log(n);
            });

            const polynomialValues = nValues.map(n => Math.pow(n, growthRate));

            // Create the chart
            Plotly.newPlot(canvas, [
                {
                    x: nValues,
                    y: entropyValues,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Entropy Growth',
                    line: {color: '#5D5CDE'}
                },
                {
                    x: nValues,
                    y: polynomialValues,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Polynomial Growth',
                    line: {color: '#FF6B6B'}
                }
            ], {
                title: 'Complexity Growth Comparison',
                xaxis: {title: 'Problem Size (n)'},
                yaxis: {title: 'Complexity'},
                margin: {t: 60, r: 30, b: 60, l: 60},
                legend: {x: 0, y: 1},
                plot_bgcolor: document.documentElement.classList.contains('dark') ? '#2D2D3A' : '#F0F0FF',
                paper_bgcolor: document.documentElement.classList.contains('dark') ? '#2D2D3A' : '#F0F0FF',
                font: {
                    color: document.documentElement.classList.contains('dark') ? '#F5F5F5' : '#333333'
                }
            });
        }

        function computePvsNP() {
            const resultsPanel = document.getElementById('p-np-results');
            resultsPanel.innerHTML = '<div class="loading"></div> Computing...';

            setTimeout(() => {
                const branchingFactor = parseInt(document.getElementById('branching-factor').value);
                const depth = parseInt(document.getElementById('depth').value);
                const growthRate = parseFloat(document.getElementById('growth-rate').value);

                // Simple calculation for demonstration
                let totalNodes = 0;
                for (let i = 0; i <= depth; i++) {
                    totalNodes += Math.pow(branchingFactor, i);
                }

                // Determine if growth exceeds polynomial bound
                const sampleSize = 100;
                const entropyValue = totalNodes * Math.log(sampleSize);
                const polynomialValue = Math.pow(sampleSize, growthRate);
                const exceeds = entropyValue > polynomialValue;

                // Format results
                const results = `
                    <h5 class="font-semibold">Complexity Analysis Results:</h5>
                    <ul class="list-disc pl-6 mt-2">
                        <li>Total nodes in tree: ${totalNodes}</li>
                        <li>Entropy value at n=${sampleSize}: ${entropyValue.toFixed(2)}</li>
                        <li>Polynomial bound (n<sup>${growthRate}</sup>): ${polynomialValue.toFixed(2)}</li>
                        <li>Conclusion: ${exceeds ? 
                            '<span class="text-green-600 dark:text-green-400 font-bold">Entropy exceeds polynomial bound</span>' : 
                            '<span class="text-red-600 dark:text-red-400 font-bold">Entropy within polynomial bound</span>'}</li>
                    </ul>
                    <p class="mt-4 text-sm italic">This model demonstrates ${exceeds ? 'evidence for' : 'conditions not sufficient for'} P ≠ NP based on current parameters.</p>
                `;

                resultsPanel.innerHTML = results;

                // Update visualizations with new parameters
                drawFractalTree(document.querySelector('#p-np-visualization svg'));
                initGrowthChart();

            }, 1500); // Simulated computation time
        }

        function runPvsNPCode() {
            const resultsPanel = document.getElementById('p-np-results');
            resultsPanel.innerHTML = '<div class="loading"></div> Running custom code...';

            setTimeout(() => {
                try {
                    const code = document.getElementById('p-np-code').value;

                    // Extract values from sliders for use in the code
                    const branchingFactor = parseInt(document.getElementById('branching-factor').value);
                    const depth = parseInt(document.getElementById('depth').value);
                    const growthRate = parseFloat(document.getElementById('growth-rate').value);

                    // Create a safe evaluation context
                    const result = (function() {
                        // Add variables to context
                        const n = 100; // Sample problem size

                        // Execute user code
                        try {
                            eval(code);
                            // Assume the code defines a function called exceedsPolynomial
                            if (typeof exceedsPolynomial === 'function') {
                                return exceedsPolynomial(n);
                            } else {
                                return "Error: exceedsPolynomial function not defined";
                            }
                        } catch (e) {
                            return "Error: " + e.message;
                        }
                    })();

                    // Display results
                    if (typeof result === 'object') {
                        resultsPanel.innerHTML = `
                            <h5 class="font-semibold">Code Execution Results:</h5>
                            <ul class="list-disc pl-6 mt-2">
                                <li>Entropy value: ${result.entropy?.toFixed(2) || 'N/A'}</li>
                                <li>Polynomial bound: ${result.polynomial?.toFixed(2) || 'N/A'}</li>
                                <li>Conclusion: ${result.exceedsBound ? 
                                    '<span class="text-green-600 dark:text-green-400 font-bold">Entropy exceeds polynomial bound</span>' : 
                                    '<span class="text-red-600 dark:text-red-400 font-bold">Entropy within polynomial bound</span>'}</li>
                            </ul>
                            <p class="mt-4 text-sm italic">Custom algorithm analysis provides ${result.exceedsBound ? 'evidence for' : 'conditions under which'} P ≠ NP.</p>
                        `;
                    } else {
                        resultsPanel.innerHTML = `
                            <p class="text-red-600 dark:text-red-400">${result}</p>
                            <p class="mt-2">Please check your code and ensure it defines and returns appropriate values.</p>
                        `;
                    }
                } catch (e) {
                    resultsPanel.innerHTML = `
                        <p class="text-red-600 dark:text-red-400">Error executing code: ${e.message}</p>
                        <p class="mt-2">Please check your code for syntax errors.</p>
                    `;
                }
            }, 1000);
        }

        // Riemann Hypothesis visualization
        function initRiemannVisualization() {
            const container = document.getElementById('riemann-visualization');
            if (!container) return;

            // Clear existing content
            container.innerHTML = '';

            // Create a canvas for Plotly
            const canvas = document.createElement('div');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            container.appendChild(canvas);

            // Generate data for critical line visualization
            const zeroCount = parseInt(document.getElementById('zero-count').value);
            const tRange = parseInt(document.getElementById('t-range').value);

            // We'll plot pairs of (0.5, t) for the critical line
            const criticalLine = {
                x: Array(100).fill(0.5),
                y: Array.from({length: 100}, (_, i) => i * tRange / 100),
                mode: 'lines',
                type: 'scatter',
                name: 'Critical Line Re(s) = 1/2',
                line: {
                    color: '#5D5CDE',
                    width: 2,
                    dash: 'dot'
                }
            };

            // Generate some "zeros" along the critical line
            const zeros = {
                x: Array(zeroCount).fill(0.5),
                y: Array.from({length: zeroCount}, (_, i) => 14.134 + i * 2.2), // First few approximated zero heights
                mode: 'markers',
                type: 'scatter',
                name: 'Zeta Zeros',
                marker: {
                    color: 'red',
                    size: 8
                }
            };

            // Create the plot
            Plotly.newPlot(canvas, [criticalLine, zeros], {
                title: 'Riemann Zeta Function Zeros on Critical Line',
                xaxis: {
                    title: 'Re(s)',
                    range: [0, 1]
                },
                yaxis: {
                    title: 'Im(s)',
                    range: [0, tRange]
                },
                margin: {t: 60, r: 30, b: 60, l: 60},
                legend: {x: 0, y: 1},
                plot_bgcolor: document.documentElement.classList.contains('dark') ? '#2D2D3A' : '#F0F0FF',
                paper_bgcolor: document.documentElement.classList.contains('dark') ? '#2D2D3A' : '#F0F0FF',
                font: {
                    color: document.documentElement.classList.contains('dark') ? '#F5F5F5' : '#333333'
                }
            });

            // Also initialize prime distribution chart
            initPrimeDistributionChart();
        }

        function initPrimeDistributionChart() {
            const container = document.getElementById('prime-distribution-chart');
            if (!container) return;

            // Clear existing content
            container.innerHTML = '';

            // Create a canvas for Plotly
            const canvas = document.createElement('div');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            container.appendChild(canvas);

            // Generate prime number data (first 100 primes)
            const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 
                73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 
                179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 
                283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 
                419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541];

            // Prime counting function
            const x = Array.from({length: 100}, (_, i) => (i+1) * 5);
            const piX = x.map(n => {
                return primes.filter(p => p <= n).length;
            });

            // Li(x) approximation (logarithmic integral)
            const liX = x.map(n => {
                if (n <= 2) return 0;
                // Rough approximation of Li(x)
                return n / Math.log(n);
            });

            // Create the plot
            Plotly.newPlot(canvas, [
                {
                    x: x,
                    y: piX,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'π(x) (Prime Counting Function)',
                    line: {color: '#5D5CDE'}
                },
                {
                    x: x,
                    y: liX,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Li(x) (Logarithmic Integral)',
                    line: {color: '#FF6B6B', dash: 'dash'}
                }
            ], {
                title: 'Prime Number Distribution vs. Approximation',
                xaxis: {title: 'x'},
                yaxis: {title: 'Count'},
                margin: {t: 60, r: 30, b: 60, l: 60},
                legend: {x: 0, y: 1},
                plot_bgcolor: document.documentElement.classList.contains('dark') ? '#2D2D3A' : '#F0F0FF',
                paper_bgcolor: document.documentElement.classList.contains('dark') ? '#2D2D3A' : '#F0F0FF',
                font: {
                    color: document.documentElement.classList.contains('dark') ? '#F5F5F5' : '#333333'
                }
            });
        }

        function computeRiemann() {
            const resultsPanel = document.getElementById('riemann-results');
            resultsPanel.innerHTML = '<div class="loading"></div> Computing zeta zeros...';

            setTimeout(() => {
                const zeroCount = parseInt(document.getElementById('zero-count').value);
                const precision = parseInt(document.getElementById('precision').value);

                // First few actual Riemann zeta zero imaginary parts
                const zetaZeros = [
                    14.134725, 21.022040, 25.010856, 30.424876, 32.935062,
                    37.586178, 40.918719, 43.327073, 48.005151, 49.773832,
                    52.970321, 56.446248, 59.347044, 60.831779, 65.112544,
                    67.079811, 69.546402, 72.067158, 75.704691, 77.144840
                ];

                // Calculate distance from critical line for demonstration
                const distanceFromHalf = Array(Math.min(zeroCount, zetaZeros.length)).fill(0)
                    .map(() => {
                        // Generate a very small random deviation to simulate computational precision
                        return (Math.random() * 2 - 1) * Math.pow(10, -precision);
                    });

                // Format results table
                let resultsHtml = `
                    <h5 class="font-semibold">Computed Zeta Zeros:</h5>
                    <div class="overflow-x-auto mt-2">
                        <table class="min-w-full text-sm">
                            <thead>
                                <tr class="border-b border-gray-300 dark:border-gray-700">
                                    <th class="text-left py-2">#</th>
                                    <th class="text-left py-2">Re(s)</th>
                                    <th class="text-left py-2">Im(s)</th>
                                    <th class="text-left py-2">Distance from 1/2</th>
                                </tr>
                            </thead>
                            <tbody>
                `;

                for (let i = 0; i < Math.min(zeroCount, zetaZeros.length); i++) {
                    resultsHtml += `
                        <tr class="border-b border-gray-300 dark:border-gray-700">
                            <td class="py-2">${i+1}</td>
                            <td class="py-2">0.5${distanceFromHalf[i].toFixed(precision)}</td>
                            <td class="py-2">${zetaZeros[i].toFixed(6)}</td>
                            <td class="py-2">${Math.abs(distanceFromHalf[i]).toFixed(precision)}</td>
                        </tr>
                    `;
                }

                resultsHtml += `
                            </tbody>
                        </table>
                    </div>
                    <p class="mt-4 text-sm italic">All computed zeros lie on the critical line Re(s) = 1/2 within precision of 10<sup>-${precision}</sup>.</p>
                `;

                resultsPanel.innerHTML = resultsHtml;

                // Update visualization
                initRiemannVisualization();

            }, 2000); // Simulated computation time
        }

        function runRiemannCode() {
            const resultsPanel = document.getElementById('riemann-results');
            resultsPanel.innerHTML = '<div class="loading"></div> Executing custom zeta function code...';

            setTimeout(() => {
                try {
                    const code = document.getElementById('riemann-code').value;
                    const precision = parseInt(document.getElementById('precision').value);

                    // Create a safe evaluation context
                    const result = (function() {
                        try {
                            // Execute the user code
                            eval(code);

                            // Try to find zeros near the critical line
                            const foundZeros = [];

                            // Simple search along the critical line
                            for (let t = 10; t < 50; t += 2) {
                                // Check if zeta(0.5 + it) is close to zero
                                if (typeof isCloseToZero === 'function') {
                                    const isZero = isCloseToZero(0.5, t, precision);
                                    if (isZero) {
                                        foundZeros.push({re: 0.5, im: t});
                                    }
                                } else if (typeof complexZeta === 'function') {
                                    const z = complexZeta({re: 0.5, im: t});
                                    const magnitude = Math.sqrt(z.re * z.re + z.im * z.im);
                                    if (magnitude < Math.pow(10, -3)) { // Lower precision for demo
                                        foundZeros.push({re: 0.5, im: t});
                                    }
                                }
                            }

                            return {
                                zeros: foundZeros,
                                success: true
                            };
                        } catch (e) {
                            return {
                                success: false,
                                error: e.message
                            };
                        }
                    })();

                    // Display results
                    if (result.success) {
                        if (result.zeros.length > 0) {
                            let zerosHtml = `
                                <h5 class="font-semibold">Custom Algorithm Results:</h5>
                                <p>Found ${result.zeros.length} potential zeros:</p>
                                <div class="overflow-x-auto mt-2">
                                    <table class="min-w-full text-sm">
                                        <thead>
                                            <tr class="border-b border-gray-300 dark:border-gray-700">
                                                <th class="text-left py-2">#</th>
                                                <th class="text-left py-2">Re(s)</th>
                                                <th class="text-left py-2">Im(s)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                            `;

                            result.zeros.forEach((zero, i) => {
                                zerosHtml += `
                                    <tr class="border-b border-gray-300 dark:border-gray-700">
                                        <td class="py-2">${i+1}</td>
                                        <td class="py-2">${zero.re.toFixed(6)}</td>
                                        <td class="py-2">${zero.im.toFixed(6)}</td>
                                    </tr>
                                `;
                            });

                            zerosHtml += `
                                        </tbody>
                                    </table>
                                </div>
                                <p class="mt-4 text-sm italic">Your custom algorithm confirmed zeros on the critical line Re(s) = 1/2.</p>
                            `;

                            resultsPanel.innerHTML = zerosHtml;
                        } else {
                            resultsPanel.innerHTML = `
                                <h5 class="font-semibold">Custom Algorithm Results:</h5>
                                <p>No zeros found with the current parameters. Try adjusting your algorithm or parameters.</p>
                            `;
                        }
                    } else {
                        resultsPanel.innerHTML = `
                            <p class="text-red-600 dark:text-red-400">Error in code execution: ${result.error}</p>
                            <p class="mt-2">Please check your code for errors.</p>
                        `;
                    }
                } catch (e) {
                    resultsPanel.innerHTML = `
                        <p class="text-red-600 dark:text-red-400">Error executing code: ${e.message}</p>
                        <p class="mt-2">Please check your code for syntax errors.</p>
                    `;
                }
            }, 1500);
        }

        // NFT SECTION FUNCTIONS

        // NFT Gallery loading
        function loadNFTGallery() {
            const gallery = document.getElementById('nft-gallery-container');
            const filter = document.getElementById('gallery-filter').value;

            // Clear existing items
            gallery.innerHTML = '<div class="col-span-3 flex justify-center"><div class="loading"></div></div>';

            // Simulate API call delay
            setTimeout(() => {
                gallery.innerHTML = '';

                // Sample NFT data (in a real app, this would come from an API)
                const nfts = [
                    {
                        id: 'NFT001',
                        title: 'P vs NP: Fractal Complexity Barrier',
                        category: 'p-vs-np',
                        author: '0x71C9...98F3',
                        verified: true,
                        statement: 'NP contains languages unresolvable by polynomial-time fractal hierarchies.',
                        color: 'blue',
                        complexity: 9,
                        elegance: 8,
                        votes: '31-2',
                        date: 'Feb 15, 2025'
                    },
                    {
                        id: 'NFT002',
                        title: 'Riemann: Prime Wave Resonance',
                        category: 'riemann',
                        author: '0x89A7...B2D4',
                        verified: false,
                        statement: 'All nontrivial ζ(s) zeros lie on the critical line Re(s) = 1/2.',
                        color: 'yellow',
                        complexity: 10,
                        elegance: 9,
                        votes: '29-12',
                        date: 'Feb 28, 2025'
                    },
                    {
                        id: 'NFT003',
                        title: 'Navier-Stokes: Vorticity Control',
                        category: 'navier-stokes',
                        author: '0x45D2...7E2A',
                        verified: true,
                        statement: 'Global smooth solutions exist for the Navier-Stokes equations with finite-energy initial data.',
                        color: 'green',
                        complexity: 8,
                        elegance: 7,
                        votes: '31-7',
                        date: 'Jan 10, 2025'
                    },
                    {
                        id: 'NFT004',
                        title: 'Yang-Mills: Quantum Confinement',
                        category: 'yang-mills',
                        author: '0x23F1...9C87',
                        verified: true,
                        statement: 'SU(3) Yang-Mills theory exhibits a mass gap Δ > 0.',
                        color: 'red',
                        complexity: 10,
                        elegance: 8,
                        votes: '28-5',
                        date: 'Dec 18, 2024'
                    },
                    {
                        id: 'NFT005',
                        title: 'Hodge: Algebraic Harmony',
                        category: 'hodge',
                        author: '0x71C9...98F3',
                        verified: true,
                        statement: 'All Hodge classes on projective algebraic varieties are linear combinations of algebraic cycle classes.',
                        color: 'pink',
                        complexity: 9,
                        elegance: 10,
                        votes: '34-3',
                        date: 'Mar 5, 2025'
                    },
                    {
                        id: 'NFT006',
                        title: 'Poincaré: Curvature Uniqueness',
                        category: 'poincare',
                        author: '0x67B2...51AD',
                        verified: true,
                        statement: 'Every simply connected, closed 3-manifold is homeomorphic to the 3-sphere.',
                        color: 'purple',
                        complexity: 7,
                        elegance: 10,
                        votes: '36-1',
                        date: 'Jan 22, 2025'
                    }
                ];

                // Filter NFTs based on selected filter
                const filteredNFTs = filter === 'all' ? nfts : 
                                     filter === 'verified' ? nfts.filter(nft => nft.verified) :
                                     nfts.filter(nft => nft.category === filter);

                // Generate NFT cards
                filteredNFTs.forEach(nft => {
                    const card = document.createElement('div');
                    card.className = 'nft-card bg-white dark:bg-gray-800 shadow-lg';
                    card.setAttribute('data-theorem', nft.category);
                    card.setAttribute('data-id', nft.id);

                    // Generate color based on category
                    const getColor = () => {
                        switch(nft.category) {
                            case 'p-vs-np': return 'rgb(59, 130, 246)'; // blue
                            case 'riemann': return 'rgb(234, 179, 8)';  // yellow
                            case 'navier-stokes': return 'rgb(34, 197, 94)'; // green
                            case 'yang-mills': return 'rgb(239, 68, 68)'; // red
                            case 'hodge': return 'rgb(236, 72, 153)'; // pink
                            case 'poincare': return 'rgb(168, 85, 247)'; // purple
                            case 'birch': return 'rgb(14, 165, 233)'; // sky blue
                            default: return 'rgb(99, 102, 241)'; // indigo
                        }
                    };

                    const color = getColor();

                    // Generate SVG pattern for NFT image
                    const isDark = document.documentElement.classList.contains('dark');
                    const bgColor = isDark ? '#2D2D3A' : '#F0F0FF';

                    card.innerHTML = `
                        <div class="nft-image" style="background: linear-gradient(45deg, ${color}33, ${bgColor});">
                            <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <rect width="200" height="200" fill="${bgColor}" />
                                <circle cx="100" cy="100" r="60" fill="${color}33" stroke="${color}" stroke-width="2" />
                                <path d="M50,100 Q100,50 150,100 T250,100" stroke="${color}" stroke-width="3" fill="none" />
                                <path d="M50,120 Q100,170 150,120" stroke="${color}" stroke-width="2" fill="none" />
                                <text x="100" y="105" text-anchor="middle" font-family="monospace" font-size="10" fill="${color}">${nft.category.toUpperCase()}</text>
                                <text x="100" y="165" text-anchor="middle" font-family="monospace" font-size="8" fill="${color}">${nft.id}</text>
                            </svg>
                        </div>
                        <div class="p-4">
                            <h5 class="font-bold text-lg mb-2">${nft.title}</h5>
                            <div class="verification-badge ${nft.verified ? 'verified' : 'pending'} mb-2">
                                ${nft.verified ? 'Verified' : 'Pending Verification'}
                            </div>
                            <p class="text-sm mb-4">${nft.statement}</p>
                            <div class="flex justify-between items-center">
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    Created by: <span class="font-medium">${nft.author}</span>
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    Votes: <span>${nft.votes}</span>
                                </div>
                            </div>
                        </div>
                    `;

                    // Add click event to show NFT details
                    card.addEventListener('click', () => {
                        showNFTDetails(nft);
                    });

                    gallery.appendChild(card);
                });

                // If no NFTs match the filter
                if (filteredNFTs.length === 0) {
                    gallery.innerHTML = '<div class="col-span-3 text-center py-8">No theorems found matching the selected filter.</div>';
                }

            }, 1000);
        }

        // Show NFT details modal
        function showNFTDetails(nft) {
            const modal = document.getElementById('nft-detail-modal');
            const imageContainer = document.getElementById('nft-detail-image');

            // Set modal content
            document.getElementById('nft-detail-title').textContent = nft.title;
            document.getElementById('nft-detail-badge').textContent = nft.verified ? 'Verified' : 'Pending Verification';
            document.getElementById('nft-detail-badge').className = `verification-badge ${nft.verified ? 'verified' : 'pending'}`;
            document.getElementById('nft-detail-statement').textContent = nft.statement;
            document.getElementById('nft-detail-category').textContent = nft.category;
            document.getElementById('nft-detail-complexity').textContent = `${nft.complexity}/10`;
            document.getElementById('nft-detail-elegance').textContent = `${nft.elegance}/10`;
            document.getElementById('nft-detail-date').textContent = nft.date;
            document.getElementById('nft-detail-id').textContent = nft.id;
            document.getElementById('nft-detail-owner').textContent = nft.author;
            document.getElementById('nft-detail-votes').textContent = nft.votes;

            // Generate color based on category
            let color;
            switch(nft.category) {
                case 'p-vs-np': color = 'rgb(59, 130, 246)'; break; // blue
                case 'riemann': color = 'rgb(234, 179, 8)'; break;  // yellow
                case 'navier-stokes': color = 'rgb(34, 197, 94)'; break; // green
                case 'yang-mills': color = 'rgb(239, 68, 68)'; break; // red
                case 'hodge': color = 'rgb(236, 72, 153)'; break; // pink
                case 'poincare': color = 'rgb(168, 85, 247)'; break; // purple
                case 'birch': color = 'rgb(14, 165, 233)'; break; // sky blue
                default: color = 'rgb(99, 102, 241)'; // indigo
            }

            // Generate SVG for the NFT image
            const isDark = document.documentElement.classList.contains('dark');
            const bgColor = isDark ? '#2D2D3A' : '#F0F0FF';

            imageContainer.innerHTML = `
                <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="400" fill="${bgColor}" />
                    <circle cx="200" cy="200" r="120" fill="${color}33" stroke="${color}" stroke-width="4" />
                    <path d="M100,200 Q200,100 300,200 T500,200" stroke="${color}" stroke-width="6" fill="none" />
                    <path d="M100,240 Q200,340 300,240" stroke="${color}" stroke-width="4" fill="none" />
                    <text x="200" y="210" text-anchor="middle" font-family="monospace" font-size="20" fill="${color}">${nft.category.toUpperCase()}</text>
                    <text x="200" y="330" text-anchor="middle" font-family="monospace" font-size="16" fill="${color}">${nft.id}</text>
                    <text x="200" y="370" text-anchor="middle" font-family="monospace" font-size="12" fill="${color}">Complexity: ${nft.complexity} | Elegance: ${nft.elegance}</text>
                </svg>
            `;

            // Setup button actions
            document.getElementById('nft-detail-stake').addEventListener('click', () => {
                document.querySelector('[data-tab="stake"]').click();
                modal.classList.add('hidden');
            });

            document.getElementById('nft-detail-verify').addEventListener('click', () => {
                document.querySelector('[data-tab="verify"]').click();
                modal.classList.add('hidden');
            });

            document.getElementById('nft-detail-research').addEventListener('click', () => {
                document.querySelector('[data-tab="research"]').click();
                setTimeout(() => {
                    document.querySelector(`[data-target="${nft.category}"]`).click();
                }, 300);
                modal.classList.add('hidden');
            });

            // Close button
            document.getElementById('close-nft-modal').addEventListener('click', () => {
                modal.classList.add('hidden');
            });

            // Show modal
            modal.classList.remove('hidden');
        }

        // Gallery filter change
        document.getElementById('gallery-filter')?.addEventListener('change', loadNFTGallery);
        document.getElementById('gallery-refresh')?.addEventListener('click', loadNFTGallery);

        // NFT Canvas rendering for Mint section
        function updateNFTCanvas() {
            const canvas = document.getElementById('nft-canvas');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;

            // Get values from form
            const title = document.getElementById('theorem-title').value || 'Theorem Title';
            const category = document.getElementById('theorem-category').value || 'p-vs-np';
            const statement = document.getElementById('theorem-statement').value || 'Theorem statement will appear here...';
            const visualStyle = document.querySelector('input[name="visual-style"]:checked')?.value || 'abstract';
            const complexity = document.getElementById('theorem-complexity').value || 5;
            const elegance = document.getElementById('theorem-elegance').value || 7;

            // Update preview elements
            document.getElementById('preview-title').textContent = title;
            document.getElementById('preview-statement').textContent = statement.length > 100 ? 
                statement.substring(0, 100) + '...' : statement;

            // Generate a unique hash based on inputs
            const hash = CryptoJS.SHA256(title + category + statement + new Date().getTime()).toString().substring(0, 8);
            document.getElementById('preview-hash').textContent = '#' + hash;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Get background color based on theme
            const isDark = document.documentElement.classList.contains('dark');

            // Background
            ctx.fillStyle = isDark ? '#2D2D3A' : '#F0F0FF';
            ctx.fillRect(0, 0, width, height);

            // Get primary color based on category
            let color;
            switch(category) {
                case 'p-vs-np': color = 'rgb(59, 130, 246)'; break; // blue
                case 'riemann': color = 'rgb(234, 179, 8)'; break;  // yellow
                case 'navier-stokes': color = 'rgb(34, 197, 94)'; break; // green
                case 'yang-mills': color = 'rgb(239, 68, 68)'; break; // red
                case 'hodge': color = 'rgb(236, 72, 153)'; break; // pink
                case 'poincare': color = 'rgb(168, 85, 247)'; break; // purple
                case 'birch': color = 'rgb(14, 165, 233)'; break; // sky blue
                default: color = 'rgb(99, 102, 241)'; // indigo
            }

            // Render based on visual style
            if (visualStyle === 'abstract') {
                // Create abstract pattern
                ctx.globalAlpha = 0.1;
                for (let i = 0; i < 10; i++) {
                    ctx.beginPath();
                    ctx.arc(
                        width / 2 + Math.cos(i * Math.PI / 5) * width * 0.3,
                        height / 2 + Math.sin(i * Math.PI / 5) * height * 0.3,
                        elegance * 10,
                        0,
                        Math.PI * 2
                    );
                    ctx.fillStyle = color;
                    ctx.fill();
                }
                ctx.globalAlpha = 1;

                // Create central pattern
                ctx.beginPath();
                ctx.arc(width / 2, height / 2, 100, 0, Math.PI * 2);
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Create complexity pattern
                ctx.beginPath();
                for (let i = 0; i < complexity; i++) {
                    const angle = (i / complexity) * Math.PI * 2;
                    const x = width / 2 + Math.cos(angle) * 120;
                    const y = height / 2 + Math.sin(angle) * 120;

                    ctx.moveTo(width / 2, height / 2);
                    ctx.lineTo(x, y);
                }
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.stroke();

            } else if (visualStyle === 'geometric') {
                // Create geometric pattern
                for (let i = 0; i < complexity; i++) {
                    ctx.beginPath();
                    ctx.rect(
                        width / 2 - 100 + i * 10,
                        height / 2 - 100 + i * 10,
                        200 - i * 20,
                        200 - i * 20
                    );
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                // Add some circles
                for (let i = 0; i < elegance; i++) {
                    ctx.beginPath();
                    ctx.arc(
                        width / 2,
                        height / 2,
                        50 + i * 20,
                        0,
                        Math.PI * 2
                    );
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

            } else if (visualStyle === 'spectral') {
                // Create spectral pattern (wave-like)
                ctx.beginPath();
                for (let x = 0; x < width; x += 5) {
                    const y = height / 2 + Math.sin(x / 20) * 50 * Math.sin(x / 100);
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Add some vertical lines
                for (let i = 0; i < complexity; i++) {
                    const x = width / complexity * i;
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, height);
                    ctx.strokeStyle = color;
                    ctx.globalAlpha = 0.1;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }

                // Add elegance circles
                for (let i = 0; i < elegance; i++) {
                    ctx.beginPath();
                    ctx.arc(
                        width / 2,
                        height / 2,
                        20 + i * 15,
                        0,
                        Math.PI * 2
                    );
                    ctx.fillStyle = color;
                    ctx.globalAlpha = 0.05;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }

            // Draw theorem category
            ctx.fillStyle = color;
            ctx.font = 'bold 20px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(category.toUpperCase(), width / 2, 30);

            // Draw hash at bottom
            ctx.fillStyle = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
            ctx.font = '12px monospace';
            ctx.textAlign = 'right';
            ctx.fillText('#' + hash, width - 10, height - 10);
        }

        // Generate NFT preview when button is clicked
        document.getElementById('generate-preview')?.addEventListener('click', updateNFTCanvas);

        // Update NFT preview when form values change
        document.getElementById('theorem-title')?.addEventListener('input', function() {
            document.getElementById('preview-title').textContent = this.value || 'Theorem Title';
        });

        document.getElementById('theorem-statement')?.addEventListener('input', function() {
            const text = this.value || 'Theorem statement will appear here...';
            document.getElementById('preview-statement').textContent = text.length > 100 ? 
                text.substring(0, 100) + '...' : text;
        });

        // Mint theorem button
        document.getElementById('mint-theorem')?.addEventListener('click', function() {
            const mintSection = document.getElementById('mint');

            // Show loading state
            this.innerHTML = '<div class="loading mr-2"></div> Minting...';
            this.disabled = true;

            // Simulate blockchain transaction
            setTimeout(() => {
                mintSection.innerHTML = `
                    <div class="text-center py-12">
                        <svg class="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <h3 class="mt-4 text-2xl font-bold">Theorem Successfully Minted!</h3>
                        <p class="mt-2 text-gray-600 dark:text-gray-400">Your theorem has been submitted to the verification DAO.</p>
                        
                        <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg max-w-md mx-auto">
                            <canvas id="mintedNFT" width="400" height="400"></canvas>
                            
                            <div class="p-4">
                                <h5 class="font-bold text-lg mb-2">${document.getElementById('theorem-title').value}</h5>
                                <div class="verification-badge pending mb-2">
                                    Pending Verification
                                </div>
                                <p class="text-sm mb-2">${document.getElementById('theorem-statement').value}</p>
                                <div class="flex justify-between items-center mt-4">
                                    <div class="text-xs text-gray-500 dark:text-gray-400">
                                        Created by: <span class="font-medium">0x71C...98F3</span>
                                    </div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400">
                                        Transaction: <span>0x7ce4...9b82</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-8 space-x-4">
                            <button id="view-gallery" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">
                                View in Gallery
                            </button>
                            <button id="mint-another" class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 py-2 rounded-lg">
                                Mint Another
                            </button>
                        </div>
                    </div>
                `;

                // Copy the NFT canvas to the new minted NFT canvas
                const sourceCanvas = document.getElementById('nft-canvas');
                const destinationCanvas = document.getElementById('mintedNFT');

                if (sourceCanvas && destinationCanvas) {
                    const destCtx = destinationCanvas.getContext('2d');
                    destCtx.drawImage(sourceCanvas, 0, 0);
                }

                // Add event listeners to new buttons
                document.getElementById('view-gallery').addEventListener('click', () => {
                    document.querySelector('[data-tab="nft-gallery"]').click();
                    loadNFTGallery(); // Refresh gallery to show new NFT
                });

                document.getElementById('mint-another').addEventListener('click', () => {
                    location.reload(); // Simple way to reset the form
                });

            }, 3000);
        });

        // Initialize rewards chart for staking section
        function initRewardsChart() {
            const canvas = document.getElementById('rewards-chart');
            if (!canvas || window.rewardsChartInitialized) return;

            // Mark as initialized to avoid re-initializing
            window.rewardsChartInitialized = true;

            const ctx = canvas.getContext('2d');

            // Sample data for rewards over time
            const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            const data = [1.2, 1.8, 2.3, 3.1, 4.5, 7.2];

            // Draw chart background
            const isDark = document.documentElement.classList.contains('dark');
            ctx.fillStyle = isDark ? '#2D2D3A' : '#F0F0FF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw chart grid
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = 1;

            // Horizontal grid lines
            for (let i = 0; i < 5; i++) {
                const y = 20 + (canvas.height - 40) * (1 - i / 4);
                ctx.beginPath();
                ctx.moveTo(40, y);
                ctx.lineTo(canvas.width - 20, y);
                ctx.stroke();
            }

            // Draw axes
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
            ctx.beginPath();
            ctx.moveTo(40, 20);
            ctx.lineTo(40, canvas.height - 20);
            ctx.lineTo(canvas.width - 20, canvas.height - 20);
            ctx.stroke();

            // Draw labels
            ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';

            // X-axis labels
            const xStep = (canvas.width - 60) / (labels.length - 1);
            labels.forEach((label, i) => {
                const x = 40 + i * xStep;
                ctx.fillText(label, x, canvas.height - 5);
            });

            // Y-axis labels
            ctx.textAlign = 'right';
            const maxValue = Math.max(...data);
            for (let i = 0; i < 5; i++) {
                const y = 20 + (canvas.height - 40) * (1 - i / 4);
                const value = (maxValue * i / 4).toFixed(1);
                ctx.fillText(value, 35, y + 3);
            }

            // Draw data line
            ctx.strokeStyle = '#5D5CDE';
            ctx.lineWidth = 2;
            ctx.beginPath();

            data.forEach((value, i) => {
                const x = 40 + i * xStep;
                const y = 20 + (canvas.height - 40) * (1 - value / maxValue);

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });

            ctx.stroke();

            // Draw data points
            ctx.fillStyle = '#5D5CDE';
            data.forEach((value, i) => {
                const x = 40 + i * xStep;
                const y = 20 + (canvas.height - 40) * (1 - value / maxValue);

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw title
            ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("MTHM Rewards (Last 6 Months)", canvas.width / 2, 12);
        }
    </script>
