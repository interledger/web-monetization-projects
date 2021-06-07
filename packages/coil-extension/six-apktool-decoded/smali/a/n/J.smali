.class La/n/J;
.super La/n/F;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/n/K;->n()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/n/E;

.field final synthetic b:La/n/K;


# direct methods
.method constructor <init>(La/n/K;La/n/E;)V
    .locals 0

    iput-object p1, p0, La/n/J;->b:La/n/K;

    iput-object p2, p0, La/n/J;->a:La/n/E;

    invoke-direct {p0}, La/n/F;-><init>()V

    return-void
.end method


# virtual methods
.method public c(La/n/E;)V
    .locals 1

    iget-object v0, p0, La/n/J;->a:La/n/E;

    invoke-virtual {v0}, La/n/E;->n()V

    invoke-virtual {p1, p0}, La/n/E;->b(La/n/E$c;)La/n/E;

    return-void
.end method
