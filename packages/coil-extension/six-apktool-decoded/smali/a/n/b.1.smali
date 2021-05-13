.class public La/n/b;
.super La/n/K;
.source ""


# direct methods
.method public constructor <init>()V
    .locals 0

    invoke-direct {p0}, La/n/K;-><init>()V

    invoke-direct {p0}, La/n/b;->r()V

    return-void
.end method

.method private r()V
    .locals 3

    const/4 v0, 0x1

    invoke-virtual {p0, v0}, La/n/K;->b(I)La/n/K;

    new-instance v1, La/n/o;

    const/4 v2, 0x2

    invoke-direct {v1, v2}, La/n/o;-><init>(I)V

    invoke-virtual {p0, v1}, La/n/K;->a(La/n/E;)La/n/K;

    new-instance v1, La/n/m;

    invoke-direct {v1}, La/n/m;-><init>()V

    invoke-virtual {p0, v1}, La/n/K;->a(La/n/E;)La/n/K;

    new-instance v1, La/n/o;

    invoke-direct {v1, v0}, La/n/o;-><init>(I)V

    invoke-virtual {p0, v1}, La/n/K;->a(La/n/E;)La/n/K;

    return-void
.end method
