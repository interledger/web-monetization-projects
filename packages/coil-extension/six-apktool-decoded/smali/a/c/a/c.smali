.class La/c/a/c;
.super La/c/a/f;
.source ""


# direct methods
.method constructor <init>()V
    .locals 0

    invoke-direct {p0}, La/c/a/f;-><init>()V

    return-void
.end method


# virtual methods
.method public a()V
    .locals 1

    new-instance v0, La/c/a/b;

    invoke-direct {v0, p0}, La/c/a/b;-><init>(La/c/a/c;)V

    sput-object v0, La/c/a/j;->b:La/c/a/j$a;

    return-void
.end method
