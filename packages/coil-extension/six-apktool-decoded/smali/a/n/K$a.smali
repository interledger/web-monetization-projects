.class La/n/K$a;
.super La/n/F;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/n/K;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x8
    name = "a"
.end annotation


# instance fields
.field a:La/n/K;


# direct methods
.method constructor <init>(La/n/K;)V
    .locals 0

    invoke-direct {p0}, La/n/F;-><init>()V

    iput-object p1, p0, La/n/K$a;->a:La/n/K;

    return-void
.end method


# virtual methods
.method public a(La/n/E;)V
    .locals 1

    iget-object p1, p0, La/n/K$a;->a:La/n/K;

    iget-boolean v0, p1, La/n/K;->N:Z

    if-nez v0, :cond_0

    invoke-virtual {p1}, La/n/E;->o()V

    iget-object p1, p0, La/n/K$a;->a:La/n/K;

    const/4 v0, 0x1

    iput-boolean v0, p1, La/n/K;->N:Z

    :cond_0
    return-void
.end method

.method public c(La/n/E;)V
    .locals 2

    iget-object v0, p0, La/n/K$a;->a:La/n/K;

    iget v1, v0, La/n/K;->M:I

    add-int/lit8 v1, v1, -0x1

    iput v1, v0, La/n/K;->M:I

    iget v1, v0, La/n/K;->M:I

    if-nez v1, :cond_0

    const/4 v1, 0x0

    iput-boolean v1, v0, La/n/K;->N:Z

    invoke-virtual {v0}, La/n/E;->a()V

    :cond_0
    invoke-virtual {p1, p0}, La/n/E;->b(La/n/E$c;)La/n/E;

    return-void
.end method
